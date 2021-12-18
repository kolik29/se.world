localStorage.removeItem('order');

$(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    $('#order_id').text(params.order_id);
    $('#customer_name').text(params.customer_name);
    $('#customer_address').text(params.customer_address);
    $('#delivery_time').text(params.delivery_time);
})