jQuery(document).ready(function () {
    jQuery('.home-banner-section').slick({
        arrows: false,
         infinite: true,
        dots: true,
    });
    jQuery('.testimonials-slider').slick({
        arrows: false,
       centerMode: true,
        centerPadding: '0px',
        dots: false,
        infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
         autoplay: true,
  autoplaySpeed: 2000,
        responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
    });
})
equalheight = function (container) {
    if (jQuery(window).width() > 767) {
        var currentTallest = 0,
            currentRowStart = 0,
            rowDivs = new Array(),
            jQueryel
        jQuery(container).each(function () {
            jQueryel = jQuery(this);
            jQuery(jQueryel).innerHeight('auto')
            rowDivs.push(jQueryel);
            currentTallest = (currentTallest < jQueryel.innerHeight()) ? (jQueryel.innerHeight()) : (currentTallest);
            for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                rowDivs[currentDiv].innerHeight(currentTallest);
            }
        });
    } else {
        jQuery(container).height('auto');
    }
}
jQuery(window).load(function() {
  equalheight('.our-service-block .outer-block h3');
});
jQuery(window).resize(function(){
  equalheight('.our-service-block .outer-block h3');
});
jQuery(document).ready(function(){
    jQuery(".venue_slider").hide();
    jQuery(".venue_slider.seat-options-slider").show();
    /* Link click */
    jQuery("#primary-menu .menu-item-type-custom").click(function(){
        
        var GetID = jQuery(this).find("a").attr('href'); 
        if(GetID=='#about-us'){
            GetID = ".elementor-element-efb728d";
        }else if(GetID=='#wellness'){
            GetID = ".elementor-element-5ec2414";
        }else if(GetID=='#homeopathy'){
            GetID = ".elementor-element-71a3055";
        }else if(GetID=='#testimonial'){
            GetID = ".elementor-element-b5f5300";
        }
        else if(GetID=='#contact-us'){
            GetID = ".elementor-element-efb728d";
        }
        console.log("GetID "+GetID);
        jQuery('html, body').animate({ scrollTop: (jQuery(GetID).offset().top - 0) },500); 
        /*if(GetID=='#7947ab4d_1607510292'){ 
            $('html, body').animate({ scrollTop: ($(GetID).offset().top - 650) },500); 
        }else{
            $('html, body').animate({ scrollTop: ($(GetID).offset().top - 100) },500); 
        }*/
    });
    /* Link Click End */
});