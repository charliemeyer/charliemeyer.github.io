$(document).ready(function() {
    var active, content;
    var links = $("#navigation").find('a');
    links = links.filter(function(){ return $(this).attr("href")[0] == '#'; });
    active = $(links.filter('[href="'+location.hash+'"]')[0] || links[0]);
    active.addClass('active');
    $("a[href='" + active.attr("href") + "']").parent().addClass('selected');
    content = $(active.attr('href'));

    links.not(active).each(function () {
        $($(this).attr('href')).hide();
    });

    $(this).on('click', 'a', function(e){
        generate_background();
        if($(this).attr('href')[0] == '#'){
            active.removeClass('active');
            $('.selected').removeClass('selected');
            content.hide();
            var new_active = $(this).attr('href');
            var state = {location: new_active};
            active = $(this);
            content = $($(this).attr('href'));
            active.addClass('active');
            $("a[href='" + active.attr("href") + "']").parent().addClass('selected');
            content.show();
            e.preventDefault();
        }
    });
});
