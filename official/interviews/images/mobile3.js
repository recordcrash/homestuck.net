function isMobile() {
    var userAgent = window.navigator.userAgent,
            re = /Mobile|Windows Phone|iPhone|iPod|BlackBerry|Opera Mobi|Opera Mini|Silk|PlayBook|Xoom/;

    if (userAgent.match(re) && !userAgent.match(/iPad/ig)) {
        return true;
    }
    else {
        return false;
    }
}

function jsonCallbackAddToCart(data)
{
    if (data.success == true)
    {
        window.location = "//"+BN_EXTERNAL_DOMAIN+"/mobile/checkout/cart.jsp";
    }
    else
    {
        var message = '<div title="Error Message">' +
                '<p>' + data.errors.errorMessages[0] + '. </p>' +
                '</div>';
        $(message).dialog({draggable: true});
    }
}
        
if (isMobile()) {
    BN_EXTERNAL_DOMAIN = mb_BN_EXTERNAL_DOMAIN;
    document.write('<meta name="viewport" content="width=device-width">' );
    document.write('<link rel="stylesheet" href="' + ds_CSS_DOMAIN + '/static/release/css/fonts.min.css"/>' );
    document.write('<link rel="stylesheet" href="' + ds_CSS_DOMAIN + '/mobile/static/css/core.css"/>');
    document.write('<link rel="stylesheet" href="' + ds_CSS_DOMAIN + '/mobile/static/css/template.css"/>');
    document.write('<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css"/>');
    document.write('<script src="' + ds_JS_DOMAIN + '/mobile/static/js/jquery.bn.auto-suggest.js"></script>');
    document.write('<script src="' + ds_JS_DOMAIN + '/mobile/static/js/external-mobile.js"></script>');
    document.write('<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>');

}
else
{
    BN_EXTERNAL_DOMAIN = ds_BN_EXTERNAL_DOMAIN;
    document.write('<link rel="stylesheet" href="' + ds_CSS_DOMAIN + '/static/release/css/bnmicrosite.css"/>' );
    document.write('<link href="https://fonts.googleapis.com/css?family=Lato:300,300i,400,400i,700,700i,900,900i" rel="stylesheet">' );
//    document.write('<link rel="stylesheet" href="' + ds_CSS_DOMAIN + '/static/release/css/checkout/checkout.min.css"/>' );
    document.write('<link rel="stylesheet" href="' + child_theme_uri + '/style.css"/>');
    document.write('<script src="' + ds_JS_DOMAIN + '/static/release/js/bnexternal.js"></script>' );
    document.write('<script src="' + ds_JS_DOMAIN + '/static/release/js/modal.modals-external.js"></script>' );
}

jQuery(document).ready(function ($) {

    if (isMobile())
    {
        $('.mobile-bag, .desktop-bag').toggleClass('hide-it');
        
        $('body').on('click tap', '.mobile-bag',
                function () {
                    var ean = ("0000000000000"+$(this).find('a').data('ean')).slice(-13);
                    $.ajax({
                        url: "//"+BN_EXTERNAL_DOMAIN+"/mobile/external/external-add-to-cart.jsp",
                        type: 'get',
                        data: {
                            'ean': ean
                        },
                        dataType: 'json',
                        xhrFields: {
                            withCredentials: true
                        },
                        beforeSend: function(request) {
	        	    if(BN_EXTERNAL_DOMAIN.indexOf(location.hostname) > -1) {
	        		request.setRequestHeader('same-origin', 'true');
	        	    }
             	        }
                    }).done(jsonCallbackAddToCart);

                }
        );
        
    }

});
