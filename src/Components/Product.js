import React, { Component } from 'react';
import './Product.css';
import { getRandomNumber } from '../utils';

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.callRandomProduct = this.callRandomProduct.bind(this);
    this.setIgnore = this.setIgnore.bind(this);
    this.gotoRecentHistory = this.gotoRecentHistory.bind(this);
  }

  getRandomValue(len) {
    let random = getRandomNumber(0, len);
    return random;
  }

  getNewItem(isIgnore) {
    const ignoreList = this.props.recentProducts
      .filter(item => item.ignore === true)
      .map(item => item.id);
    const nowId = parseInt(this.props.match.params.id);
    const nowProduct = this.props.productData.find(e => e.id === nowId);
    ignoreList.push(nowId);

    const productList = this.props.productData.filter(item => !ignoreList.includes(item.id));

    if (productList.length === 0) {
      this.props.history.push(`/product/-1`);
    } else {
      nowProduct.ignore = isIgnore;
      this.props.addRecentHistory(nowProduct);
      let random = this.getRandomValue(productList.length);
      const nextProduct = productList[random];
      this.props.history.push(`/product/${nextProduct.id}`);
    }
  }

  callRandomProduct() {
    this.getNewItem(false);
  }

  setIgnore() {
    this.getNewItem(true);
  }

  gotoRecentHistory() {
    this.props.history.push(`/recentList`);
  }

  render() {
    const data = this.props.productData.find(
      item => item.id === parseInt(this.props.match.params.id),
    );

    return (
      <div className="content-container">
        {data ? (
          <>
            <div className="product-img" />
            <div className="content">
              <div className="content-info">
                <p>{data.id}</p>
                <h4>{data.title}</h4>
                <h4>{data.brand}</h4>
                <h4>{data.price} 원</h4>
              </div>
              <input
                className="product-btn"
                type="button"
                value="랜덤 상품 조회"
                onClick={this.callRandomProduct}
              />
              <input
                className="product-btn"
                type="button"
                value="관심 없음"
                onClick={this.setIgnore}
              />
              <input
                className="product-btn"
                type="button"
                value="최근 본 상품"
                onClick={this.gotoRecentHistory}
              />
            </div>
          </>
        ) : (
          <>
            '더 이상 조회할 상품이 없습니다'
            <input
              className="product-btn"
              type="button"
              value="최근 본 상품"
              onClick={this.gotoRecentHistory}
            />
          </>
        )}
      </div>
    );
  }
}
