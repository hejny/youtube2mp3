(function() {

    var script = document.createElement("SCRIPT");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName("head")[0].appendChild(script);


    var checkReady = function(callback) {
        if (window.jQuery) {
            callback(jQuery);
        }
        else {
            window.setTimeout(function() { checkReady(callback); }, 100);
        }
    };


    checkReady(function($) {


        var reload = function() {
            var request = $.get('https://localhost/youtube/app/api/item.php').done(function (response) {

                var response = Object.keys(response).map(function(k) { return response[k] });
                console.log(response);


                $('.addbutton').remove();

                var links = $/*('.video-list').find*/('a[href^="/watch"]');



                links.each(function () {


                    position = $(this).position();



                    var plus;
                    plus = $('<div>+</div>');


                    plus.addClass('addbutton');
                    /*plus.css('float', 'right');*/
                    plus.css('position', 'absolute');
                    plus.css('top', position.top);
                    plus.css('left', position.left);
                    plus.css('z-index', 99999);


                    plus.css('width', '30px');
                    plus.css('height', '30px');
                    plus.css('border', '2px solid #00f');
                    plus.css('border-radius', '500px');
                    plus.css('background', '#fff');


                    plus.css('text-align', 'center');
                    plus.css('font-size', '25px');
                    plus.css('color', '#00f');
                    plus.attr('inlist', 'no');


                    var url = $(this)[0].href;



                    response.forEach(function (video) {
                        if (video.url === url) {


                            if(video.actions.downloading.finish!==false){
                                plus.text('✓');
                                plus.css('background', '#6f9');
                            }else /**/
                            if(video.actions.downloading.start!==false){
                                plus.text('✓');
                                plus.css('background', '#ff5');
                            }else{
                                plus.text('✓');
                                plus.css('background', '#ccc');
                            }


                            plus.attr('inlist', 'yes');

                        }
                    });


                    plus.click(function (e) {

                        e.preventDefault();

                        var button = $(this);
                        button.text('');
                        button.css('background', '#eee');


                        var request = $.post(
                            'https://localhost/youtube/app/api/item.php', {url: url}
                        ).done(
                            function () {

                                /*if (button.attr('inlist') == 'no') {
                                    button.attr('inlist', 'yes');
                                    button.css('background', '#6f9');
                                } else {
                                    button.attr('inlist', 'no');
                                    button.css('background', '#fff');
                                }*/
                                reload();

                            }
                        ).fail(
                            function () {

                                reload();
                                /*button.css('background', '#f00');*/
                            }
                        );


                    });

                    $(this).append(plus);


                });
            });

        };

        reload();


    });
})();