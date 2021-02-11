import { createStore, bindActionCreators } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import reducer from './reducer';
import * as actions from './actions';
import Table from './components/table';

const store = createStore(reducer);

const { dispatch } = store;

const { setStore } = bindActionCreators(actions, dispatch);

const setStoreField = (Field, Value) => {
    let State = store.getState();

    State[Field] = Value;

    invokeEvent('onChangeStoreField', {Field: Field});

    setStore(State);
}

const getBaseAdress = (Arg = '') => {
    return '';
}

const makeRequestUrl = (base, params) => {
    let ParamArray = [];

    for (let key in params) {
        ParamArray.push(key + '=' + params[key]);
    }

    return base + '?' + ParamArray.join('&');
}

const onChangeStoreField = (Field) => {
    switch (Field) {
        case 'TotalPrice':
        renderTotalCost();
        break;
    }
};

const invokeEvent = (Event, Params) => {
    switch (Event) {
        case 'onChangeStoreField':
            onChangeStoreField(Params.Field);
            break;
    }
};

const reloadTableDataSet = () => {
    const State = store.getState();

    const TestTable = [
        {
            Flag: 1,
            id: 1,
            Number: 'YE23563564FGFH',
            Name: 'Бампер передний',
            Cost: 4500,
            Quantity: '1',
            Total: 4500,
            Orig: '+',
            Neorig: '-',
            Posdate: '25.08.2020',
            Dosdate: '27.08.2020',
            Filter: 'remove'
        },{
            Flag: 1,
            id: 2,
            Number: '23GFT278543',
            Name: 'Молдинг бампера правый',
            Cost: 1500,
            Quantity: '1',
            Total: 1500,
            Orig: '-',
            Neorig: '+',
            Posdate: '10.09.2020',
            Dosdate: '22.09.2020',
            Filter: 'remove'
        },{
            Flag: 1,
            id: 3,
            Number: '456FFGYHSQS',
            Name: 'Бампер задний',
            Cost: 3000,
            Quantity: '1',
            Total: 3000,
            Orig: '-',
            Neorig: '+',
            Posdate: '22.09.2020',
            Dosdate: '23.09.2020',
            Filter: 'remove'
        },{
            Flag: 1,
            id: 4,
            Number: 'BBCGJ3213X',
            Name: 'Дверь передняя левая',
            Cost: 6500,
            Quantity: '1',
            Total: 6500,
            Orig: '+',
            Neorig: '-',
            Posdate: '25.09.2020',
            Dosdate: '12.10.2020',
            Filter: 'remove'
        },{
            Flag: 1,
            id: 5,
            Number: 'CHSDJH231HC',
            Name: 'Переднее ветровое стекло',
            Cost: 16478,
            Quantity: '1',
            Total: 16478,
            Orig: '+',
            Neorig: '-',
            Posdate: '25.09.2020',
            Dosdate: '12.10.2020',
            Filter: 'remove'
        }
    ]
    setStoreField("TableDataSet", TestTable);
    // const Params = {
    //     method: "crm.carobject.list"
    // };

    // axios
    //     .post(makeRequestUrl(getBaseAdress(), Params))
    //     .then((Response) => {
    //         setStoreField('TableDataSet', Response.data.data);
    //     });

}

    

const renderTotalCost = () => {
    ReactDOM.render(
    <span>{store.getState().TotalPrice} ₽</span>,
    document.getElementById('TotalPrice'));
}

const sendRecord = () => {
    const State = store.getState();

    const Params = {
        method: "",
        testarray: State.TableDataSet
    };

    axios
    .post(makeRequestUrl(getBaseAdress(), Params))
    .then((Response) => {
        console.log(Response);
    });
}

const FilterProduct = (e) => {

    const state = store.getState();

    let button = e.target.id;
    let brandArray = state.TableDataSet;

    let brandObject = brandArray.find((obj => obj.id == button));

        if(brandObject.Flag == 1) {
            brandObject.Flag = 0;
            brandObject.Filter ='add';
        }
        else{
            brandObject.Flag = 1;
            brandObject.Filter ='remove';
        }
    setStoreField('TableDataSet', brandArray);   
    totalPrice(); 
}

const totalPrice = () => {
    const State = store.getState();

    let ProductArray = State.TableDataSet;
    let Total = 0;

    ProductArray.forEach(function(Row){
        if(Row.Flag == 1) {
           return Total = Row.Total + Total;
        }
    });

    setStoreField('TotalPrice', Total);

    console.log(store.getState().TotalPrice);
}


const removeProduct = () => {
    const State = store.getState();

    let ProductArray = State.TableDataSet;

    ProductArray.forEach(function(Row){
        if(Row.Flag == 1) {
            Row.Flag = 0;
            Row.Filter ='add';
        }
    });

    console.log(State);

    setStoreField('TableDataSet', ProductArray);

    totalPrice();
}

const addProduct = () => {
    const State = store.getState();

    let ProductArray = State.TableDataSet;

    ProductArray.forEach(function(Row){
        if(Row.Flag == 0) {
            Row.Flag = 1;
            Row.Filter ='remove';
        }
    });

    console.log(State);

    setStoreField('TableDataSet', ProductArray);
    totalPrice();
}

const wndRefresh = () => {
    ReactDOM.render(
        <Table
          Store={store.getState()}
          FilterProduct={FilterProduct}
          removeProduct={removeProduct}
          addProduct={addProduct}
          sendRecord={sendRecord}
          />, 
          document.getElementById('TableContainer')
    );

};

const init = () => {
    reloadTableDataSet();
    wndRefresh();
    totalPrice();
    renderTotalCost();
};

store.subscribe(() => {
    wndRefresh();
    console.log(store.getState());
});

init();