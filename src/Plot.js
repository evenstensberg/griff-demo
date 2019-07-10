import React, { PureComponent } from 'react';

import {
    DataProvider,
    Series,
    Collection,
    LineChart
} from '@cognite/griff-react';


/* Since NOAA Api has no timestamps on their objects we generate some based on their idx */
const generateDataPoints = ({
    timeDomain,
}, telemetry) => {
    const data = [];
    let j = 0;
    const dt = (timeDomain[1] - timeDomain[0]) / telemetry.length + 1;
    for (let i = timeDomain[0]; i <= timeDomain[1]; i += dt) {
        data.push({
            timestamp: i,
            value: telemetry[j].value,
        });
        j++;
    }
    return data;
};


/* Simple Loader that returns the api data with timestamp and a value */
export const demoLoader = (data, {
    timeDomain,
}) => ({
    data: generateDataPoints({ timeDomain }, data).map(point => [point.timestamp, point.value]),
});

const Footer = () => (
    <>
        <h4 style={{
            width: '9%',
            margin: 'auto',
            position: 'absolute',
            right: '50%',
            bottom: '1%'
        }}
            onClick={() => window.open('https://cognite.com')}
        >Made by <strong style={{ color: 'navy', textDecoration: 'underline' }}>Cognite</strong>⚡️</h4>
    </>
);

const JanToJulyRanges = [1514764800000, 1530662400000]; // 1st Jan - 4th July 2018

class ScatterPlot extends PureComponent {
    render() {
        const { data } = this.props;
        return (
            <div
                style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: '80%',
                    height: '100%',
                }}
            >
                <>
                    <>
                        <div style={{ height: '500px', width: '100%', marginTop: '10%' }}>
                            {data.length > 0 ? <DataProvider

                                defaultLoader={(args) => demoLoader(data, args)}
                                timeDomain={JanToJulyRanges}
                                timeAccessor={d => d[0]}
                                yAccessor={d => d[1]}
                            > <Collection id="collection">
                                    <Series id="1" color="steelblue" drawPoints />
                                </Collection>

                                <LineChart />
                            </DataProvider> : <h3 style={{ fontStyle: 'italic', textAlign: 'center' }}>Fetching data from NOAA... ☀️</h3>}
                        </div>
                        <Footer />
                    </>
                </>
            </div>
        )
    }
}

export default ScatterPlot;