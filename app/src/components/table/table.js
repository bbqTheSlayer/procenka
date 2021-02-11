import React, {Component} from 'react';

export default class Table extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    changeHadler(e)
    {
        this.props.FilterProduct(e);
    }

    removeProductFilter()
    {
        this.props.removeProduct();
    }
    
    addProductFilter()
    {
        this.props.addProduct();
    }
    render()
    {
        const ProductArray = this.props.Store.TableDataSet;
        const TotalPrice = this.props.Store.TotalPrice;

        const Products = ProductArray.map((Row, i) => {
            return  (
                <div className="content" key={i}>
                        <h3 className="col-xs-12 hidden-md hidden-lg">
                            {Row.Name}
                        </h3>

                        <div className="col-xs-9 col-md-1 col-lg-1 table-mpbile hidden-xs hidden-sm">
                            <a className="btn-floating btn-small waves-effect waves-light blue-grey lighten-1 btn-rem" onClick={(e) => {this.changeHadler(e)}} id={Row.id}>
                                <i className="material-icons icon-rem" id={Row.id}>
                                    {Row.Filter}
                                </i>
                            </a>
                        </div>

                        <div className="col-xs-9 col-md-2 col-lg-2 table-mobile">
                            <span className="prompt">
                                №
                            </span>

                            <span>
                                {Row.Number}
                            </span>
                        </div>

                        <div className="col-xs-9 col-md-2 col-lg-2 table-mobile hidden-xs hidden-sm">
                            <span>
                                {Row.Name}
                            </span>
                        </div>

                        <div className="col-xs-9 col-md-1 col-lg-1 table-mobile">
                            <span className="prompt">
                                Стоимость продажи
                            </span>

                            <span>
                                {Row.Cost} ₽
                            </span>
                        </div>

                        <div className="col-xs-3 hidden-md hidden-lg">
                            <a className="btn-floating btn-medium waves-effect waves-light blue-grey lighten-1 btn-rem" onClick={(e) => {this.changeHadler(e)}} id={Row.id}>
                                <i className="material-icons icon-rem" id={Row.id}>
                                    {Row.Filter}
                                </i>
                            </a>
                        </div>

                        <div className="col-xs-9 col-md-1 col-lg-1 table-mobile">
                            <span className="prompt">
                                Кол-во
                            </span>

                            <span>
                                {Row.Quantity}
                            </span>
                        </div>

                        <div className="col-xs-9 col-md-1 col-lg-1 table-mobile hidden-xs hidden-sm">
                            <span>
                                {Row.Total} ₽
                            </span>
                        </div>

                        <div className="col-xs-9 col-md-1 col-lg-1 table-mobile hidden-xs hidden-sm">
                            <span>
                                {Row.Orig}
                            </span>
                        </div>

                        <div className="col-xs-9 col-md-1 col-lg-1 table-mobile hidden-xs hidden-sm">
                            <span>
                                {Row.Neorig}
                            </span>
                        </div>

                        <div className="col-xs-9 col-md-1 col-lg-1 table-mobile">
                            <span className="prompt">
                                Срок поставки
                            </span>

                            <span>
                                {Row.Posdate}
                            </span>
                        </div>

                        <div className="col-xs-9 col-md-1 col-lg-1 table-mobile hidden-xs hidden-sm">
                            <span>
                                {Row.Dosdate}
                            </span>
                        </div>
                </div>
            )
        });

        return (
            <>
                <div className="z-depth-3">
                    <div className="table-head">
                        <div className="col-xs-12 col-md-1 col-lg-1 text-center">
                            Выбрать
                        </div>

                        <div className="col-xs-12 col-md-2 col-lg-2 text-center">
                            № Каталожный
                        </div>

                        <div className="col-xs-12 col-md-2 col-lg-2 text-center">
                            Наименование
                        </div>

                        <div className="col-xs-12 col-md-1 col-lg-1 text-center">
                            Стоимость продажи
                        </div>

                        <div className="col-xs-12 col-md-1 col-lg-1 text-center">
                            Кол-во
                        </div>

                        <div className="col-xs-12 col-md-1 col-lg-1 text-center">
                            Итого
                        </div>

                        <div className="col-xs-12 col-md-1 col-lg-1 text-center">
                            Ориг
                        </div>

                        <div className="col-xs-12 col-md-1 col-lg-1 text-center">
                            НЕ ориг
                        </div>

                        <div className="col-xs-12 col-md-1 col-lg-1 text-center">
                            Срок поставки
                        </div>

                        <div className="col-xs-12 col-md-1 col-lg-1 text-center">
                            Дата доставки
                        </div>
                    </div>

                    <div className="table-body">
                        {Products}
                    </div>

                    <div className="table-footer">
                        <div className="row footer">
                            <div className="col-xs-12 col-md-12 col-lg-12">
                                <div className="col-xs-6 col-md-10 col-lg-10 add-all">
                                    <button className="btn waves-effect waves-light blue-grey lighten-1 filter-button add-all" onClick={() => {this.addProductFilter()}}>
                                        Добавить все
                                    </button>
                                </div>

                                <div className="col-xs-6 col-md-2 col-lg-2 rem-all">
                                    <button className="btn waves-effect waves-light blue-grey lighten-1 filter-button rem-all" onClick={() => {this.removeProductFilter()}}>
                                        Убрать все
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="row footer">
                            <div className="col-xs-12 col-md-12 col-lg-12">
                                <div className="col-xs-6 col-md-10 col-lg-10 sum-product" id="TotalPrice">
                                    
                                </div>

                                <div className="col-xs-6 col-md-2 col-lg-2 sum-product">
                                    <button className="btn waves-effect waves-light red lighten-1 buy-button" onClick={() => {this.props.sendRecord()}}>
                                        Заказать
                                        <i className="material-icons right">
                                            local_grocery_store
                                        </i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}