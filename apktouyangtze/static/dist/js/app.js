$(document).ready(function() {
    const savedLang = localStorage.getItem('selectedLanguage');
    if (savedLang) {
        changeLanguage(savedLang);
        $(`.lang-selector[data-lang="${savedLang}"]`).addClass('active');
    } else {
        changeLanguage('en');
        $(`.lang-selector[data-lang="en"]`).addClass('active');
    }
});

function changeLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang);

    $.ajax({
        url: `/get_translation/${lang}`,
        method: 'GET',
        success: function(data) {
            const elementsToUpdate = {
                'home-title': 'general_title',
                'base-title': 'general_title',
                'base-about': 'about_base',
                'base-about-desc': 'about_base_desc',
                'home-page-1': 'home_page_1',
                'home-page-2': 'home_page_2',
                'previous-page': 'previous_page',
                'next-page': 'next_page',
                'back-home': 'back_home',
            };

            for (const [elementId, dataKey] of Object.entries(elementsToUpdate)) {
                $(`#${elementId}`).text(data[dataKey]);
            }

            const dynamicIds = [12221, 12373, 12529, 13943, 13977, 14025, 14031, 14064, 14086, 14098, 14130, 14135, 14772, 14806, 14836, 14841];
            dynamicIds.forEach(id => {
                const baseId = `id${id}`;
                const variations = ['name', 'desc'];

                variations.forEach(variation => {
                    $(`#${baseId}-${variation}`).text(data[`${baseId}_${variation}`]);
                    $(`#${baseId}-title`).text(data[`${baseId}_name`]);
                    $(`#${baseId}-desc-short`).text(data[`${baseId}_desc_short`]);
                    $(`#${baseId}-view`).text(data[`home_view`]);
                });
            });
        },
        error: function() {
            alert('Error loading language content');
        }
    });
}

$('.lang-selector').on('click', function() {
    $('.lang-selector').removeClass('active');
    $(this).addClass('active');
    const lang = $(this).data('lang');
    changeLanguage(lang);
});
