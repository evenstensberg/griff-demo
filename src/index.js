import React, { Component, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import axios from 'axios';

const ScatterPlot = lazy(() => import('./Plot'));

async function getData() {
    const apiToken = '<API_KEY>';
    const url = "https://www.ncdc.noaa.gov/cdo-web/api/v2/data";
    return await axios.get(url, {
        headers: {
            token: apiToken,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        params: {
            datasetid: 'GSOM',
            startdate: '2018-01-01',
            enddate: '2018-07-04',
            stationId: 'COOP:040192',
            limit: 100
        }
    });
}


class App extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
        }
    }
    async componentDidMount() {
        const response = await getData();
        this.setState({
            data: response.data.results
        });
    }
    render() {
        const { data } = this.state;

        return (
            <>
                <Suspense fallback={<div>Loading UI...</div>}>
                    <ScatterPlot data={data} />
                </Suspense>
            </>
        );
    }
}

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root'),
    );
};

render(App);

if (module.hot) {
    module.hot.accept('.', () => {
        const nextApp = require('.').default;
        render(nextApp);
    });
}
