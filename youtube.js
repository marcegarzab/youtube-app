/*
display max 10 videos:
-title
-thumbnail image

-if you click either, new tab opens video
-button to get more results(using the previous and next page links from the JSON)
*/

function buildFetch(searchKeyword, callback, pageToShow){
    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/search',
        method: 'GET',
        data: {
            part: 'snippet',
            q: searchKeyword,
            maxResults: 10,
            type: 'video',
            pageToken: pageToShow,
            key: 'AIzaSyAjo43xm-IHf5hCivLmbloidBjQdHGjhTc'
        },
        dataType: 'json',
        success: responseJSON => callback(responseJSON),
        error: err => $('.results').html(err.message)
    });

}

function displayResults(data){
    let results = $('.results');
    results.html('');

    if("previousPage" in data){
        $('.previousPageButton').val(data.previousPage)
    } else {
        $('.previousPageButton').val('');
    }
    if("nextPage" in data){
            $('.nextPageButton').val(data.nextPage)
    }else{
        $('.nextPageButton').val('');
    }

    data.items.forEach((video => {
        results.append(`<li>
                            <a href=https://www.youtube.com/watch?v=${video.id.videoId} target="_blank">
                                <h5>${video.snippet.title}</h5>
                                <img src="${video.snippet.thumbnails.high.url}" alt="Thumbnail for video ${video.snippet.title}" height="200" width="300">
                            </a>
                        </li>
                        <br>
                        <br>`);
    }));
}

function watchForm(){
    $('.youtubeForm').on('submit', (event) => {
        event.preventDefault();
        let youtubeSearch = $('#youtubeSearchBox').val();
        buildFetch(youtubeSearch, displayResults);
    });

    $(".previousPageButton").on('click', () => {
        event.preventDefault();
        buildFetch(youtubeSearch, displayResults, $(".previousPageButton").val());
    });

    $(".NextPageButton").on('click', () => {
        event.preventDefault();
        buildFetch(youtubeSearch, displayResults, $(".nextPageButton").val());
    });
}

$(watchForm);