var flag = false;
$(document).ready(function () {
    $('form').submit(function(e){

        $("#submit").fadeOut(0);
        $(".loader").addClass("loader-visible");
        
        setTimeout(() => { $(".loader").removeClass("loader-visible"); }, 500);
        
        setTimeout(() => { $("p").addClass("visible"); }, 500);
        
        setTimeout(() => { this.reset(); }, 1000);


    });
    $("#image").change(function (e) {
        var file = this.files[0];
        var reader = new FileReader();

        reader.onloadend = function () {
            $("#imagePreview").attr("src", reader.result).show();
            
        }

        if (file) {
            reader.readAsDataURL(file);
        }
        else {
            $("i#magePreview").attr('src', '').hide();
        }
    });
});   
$("#new-releases").click(function () {
    if (!flag) {
        fetch("http://localhost:3000/all-data/")
            .then(response => {
                if (!response.ok) {
                    throw Error("Network is not ok")
                };
                return response.json();
            
            })
            .then(data => {
                data.forEach((item, index) => {
                    const container = document.createElement('div');
                    container.style.display = 'flex';
                    container.style.gap = '10px';
                    container.style.width = '500px';
                    container.style.height = '200px';
                    container.style.marginBottom = '20px';

                    const imageContainer = document.createElement('div');
                    imageContainer.style.width = '50%';
                    imageContainer.style.paddingRight = '10px';
                    const image = document.createElement('img');
                    console.log(item.image);
                    image.src = "https://localhost:3000/" + item.image;
                    image.style.width = '150px';
                    image.style.height = '150px';
                    imageContainer.style.display = 'flex';
                    imageContainer.style.justifyContent = 'center';
                    imageContainer.style.alignItems = 'center';
                    imageContainer.appendChild(image);

                    const infoContainer = document.createElement('div');
                    infoContainer.style.width = '50%';
                    infoContainer.style.paddingRight = '10px';
                    infoContainer.innerHTML = `
                <p><i>${item.artistName}</i></p>
                <p><i>${item.songTitle}</i></p>
                <p>${new Date(item.date).toISOString().slice(0,10).split('-').reverse().join('-')}</p>
                <p>${item.genre}</p>
                <p>${item.recordLabel}</p>`;
                    infoContainer.style.color = 'white';

                    container.appendChild(imageContainer);
                    container.appendChild(infoContainer);
                    app.appendChild(container);

                    flag = true;

                });
            })
        
    }
        
    
})