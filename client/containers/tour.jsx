import React, { Component } from 'react';
import parseHtml from '../utils/parse-html.js';

const docKey = '1oYioBMm1ivrmJwCTpQqhkKJ2DQClyreWAG_6z9OGgbw';

const getDoc = (docKey) => {
  const docPath = `https://docs.google.com/feeds/download/documents/export/Export?id=${docKey}&exportFormat=html`;
  return new Promise((resolve) => {
    fetch(docPath)
      .then((response) => response.text())
      .then((result) => {
        const { html, styles } = parseHtml(result);
        resolve(html + styles);
      });
  });
};

class Tour extends Component {
  constructor() {
    super();
    this.state = {
      content: '',
    };
  }

  componentDidMount() {
    getDoc(docKey)
      .then((content) => this.setState({
        content,
      }));
  }

  render() {
    const { content } = this.state;
    return (
      <main>
        <h1>Hello World!!!</h1>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </main>
    );
  }
}

export default Tour;
