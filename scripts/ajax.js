function url(dispatch) {
    return 'https://madfrenzy.com/?dispatch=' + dispatch;
}

function post(dispatch) {
    return new Promise((resolve, reject) => {
        $.post(url(dispatch), {
            crossDomain: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
        .done(data => {
            resolve(JSON.parse(data));
        })
        .fail(data => {
            reject(data);
        });

        if (dispatch == 'seworld.products_expected')
            resolve([
                {
                    id: 1,
                    variations: {
                        XL: 10,
                        XXL: 11
                    },
                    name: 'Трусы',
                    pairs: {
                        main_pair: 'draft.png',
                        pairs: [
                            {
                                src: 'img2',
                                desc: 'lorem ipsum'
                            }, {
                                src: 'img3',
                                desc: 'dolor sit amet'
                            }
                        ]
                    },
                    desc: 'Стильные, модные, не купленные на рынке',
                    price: '1000 ₽',
                    date: '11.10.2021'
                },
                {
                    id: 2,
                    variations: {
                        XL: 21,
                        XXL: 22
                    },
                    name: 'Носки',
                    pairs: {
                        main_pair: 'img1',
                        pairs: [
                            {
                                src: 'img2',
                                desc: 'lorem ipsum'
                            }, {
                                src: 'img3',
                                desc: 'dolor sit amet'
                            }
                        ]
                    },
                    desc: 'Стильные, модные, не купленные на рынке',
                    price: '1000 ₽',
                    date: '11.10.2021'
                }
            ]);

        if (dispatch == 'seworld.products_in_stock')
            resolve([
                {
                    id: 3,
                    variations: {
                        XL: 10,
                        XXL: 11
                    },
                    name: 'Стильное модное молодёжное пальто',
                    pairs: {
                        main_pair: 'products/1.jpg',
                        pairs: [
                            {
                                src: 'img2',
                                desc: 'lorem ipsum'
                            }, {
                                src: 'img3',
                                desc: 'dolor sit amet'
                            }
                        ]
                    },
                    desc: 'Стильные, модные, не купленные на рынке',
                    price: '10 000 ₽'
                },
                {
                    id: 4,
                    variations: {
                        XL: 21,
                        XXL: 22
                    },
                    name: 'Носки',
                    pairs: {
                        main_pair: 'img1',
                        pairs: [
                            {
                                src: 'img2',
                                desc: 'lorem ipsum'
                            }, {
                                src: 'img3',
                                desc: 'dolor sit amet'
                            }
                        ]
                    },
                    desc: 'Стильные, модные, не купленные на рынке',
                    price: '1000 ₽'
                },
                {
                    id: 5,
                    variations: {
                        XL: 21,
                        XXL: 22
                    },
                    name: 'Носки',
                    pairs: {
                        main_pair: 'img1',
                        pairs: [
                            {
                                src: 'img2',
                                desc: 'lorem ipsum'
                            }, {
                                src: 'img3',
                                desc: 'dolor sit amet'
                            }
                        ]
                    },
                    desc: 'Стильные, модные, не купленные на рынке',
                    price: '1000 ₽'
                },
                {
                    id: 6,
                    variations: {
                        XL: 31,
                        XXL: 32
                    },
                    name: 'Модная кепка',
                    pairs: {
                        main_pair: 'cap/cap1.jpg',
                        pairs: [
                            {
                                src: 'cap/cap2.jpg',
                                desc: 'lorem ipsum 1'
                            },
                            {
                                src: 'cap/cap3.jpg',
                                desc: 'lorem ipsum 2'
                            },
                            {
                                src: 'cap/cap4.jpg',
                                desc: 'lorem ipsum 3'
                            },
                            {
                                src: 'cap/cap5.jpg',
                                desc: 'lorem ipsum 4'
                            },
                            {
                                src: 'cap/cap6.jpg',
                                desc: 'lorem ipsum 5'
                            },
                            {
                                src: 'cap/cap7.jpg',
                                desc: 'lorem ipsum 6'
                            },
                            {
                                src: 'cap/cap8.jpg',
                                desc: 'lorem ipsum 7'
                            }
                        ]
                    },
                    desc: 'Стильные, модные, не купленные на рынке',
                    price: '1000 ₽'
                }
            ]);

        if (dispatch == 'seworld.get_cart')
            resolve({
                full_price: '12345 ₽',
                products: [
                    {
                        id: 1,
                        variations: {
                            XL: 2,
                        },
                        name: 'Шапка',
                        pairs: {
                            main_pair: 'img1',
                            pairs: {
                                src: 'img2',
                                desc: 'img3',
                            }
                        },
                        desc: 'описание товара',
                        price: '1000 ₽',
                        type: 'T-shirt'
                    }
                ]
            });
    });
}