const switcher = document.querySelector('#cbx'),
      more = document.querySelector('.more'),
      modal = document.querySelector('.modal'),
      videos = document.querySelectorAll('.videos__item');
let player;

function bindSlideToggle(trigger, boxBody, content, openClass) {
    let button = {
        'element': document.querySelector(trigger),
        'active': false
    };
    const box = document.querySelector(boxBody),
          boxContent = document.querySelector(content);
    
          button.element.addEventListener('click', () => {
              if (button.active === false) {    // Проверка открыто ли меню
                button.active = true;         // Если не открыто, открываем
                box.style.height = boxContent.clientHeight + 'px';
                box.classList.add(openClass);    //Активный класс для меню
              } else {
                  button.active = false;
                  box.style.height = 0 + 'px';
                  box.classList.remove(openClass);     
              }
          });
}

bindSlideToggle('.hamburger', '[data-slide="nav"]', '.header__menu', 'slide-active');

function switchMode() {
    if (night === false) {
        night = true;
        document.body.classList.add('night');
        document.querySelectorAll('.hamburger > line').forEach(item => {
            item.style.stroke = '#fff';
        });

        document.querySelectorAll('.videos__item-descr').forEach(item => {
            item.style.color = '#fff';
        });
        document.querySelectorAll('.videos__item-views').forEach(item => {
            item.style.color = '#fff';
        });

        document.querySelectorAll('.videos__item img').forEach(item => {
            item.style.boxShadow = '0 0 30px rgba(255, 255, 255, .50)';
        });

        document.querySelectorAll('.header__item-descr').forEach(item => {
            item.style.color = '#fff';
        });
        
        document.querySelector('.logo > img').src = 'logo/kain_night.png';
    } else {
        night = false;
        document.body.classList.remove('night');
        document.querySelectorAll('.hamburger > line').forEach(item => {
            item.style.stroke = '#000';
        });
        document.querySelectorAll('.videos__item-descr').forEach(item => {
            item.style.color = '#000';
        });
        document.querySelectorAll('.videos__item-views').forEach(item => {
            item.style.color = '#000';
        });

        document.querySelectorAll('.header__item-descr').forEach(item => {
            item.style.color = '#000';
        });
        document.querySelectorAll('.videos__item img').forEach(item => {
            item.style.boxShadow = '0 0 30px rgba(0, 0, 0, .60)';
        });
        document.querySelector('.logo > img').src = 'logo/kain.png';
    }
}

let night = false;
switcher.addEventListener('change', () => {
    switchMode();
});

// const data = [
//     ['img/thumb_3.webp', 'img/thumb_4.webp', 'img/thumb_5.webp'], 
//     ['кАин - Мерцание | Анимационный клип к треку "Мерцание" из альбома "Потерянный Свет" 2006 года.',
//     'кАин - Маски | Анимационный клип к композиции "Маски" из альбома "НЕБылО" 2005г.', 
//     'ДжимФаер (Иллифия) | Конкурсная работа для игры DARK AGE "Бард мира Эйры"'], 
//     ['211 просмотров', '136 просмотров', '1 155 просмотров'],  ['R25dckIK2I4', 'ROafiLX5V_k', 'VRLDgW7rBng']
// ];

// more.addEventListener('click', () => {
//     const videosWrapper = document.querySelector('.videos__wrapper');
//     more.remove();

//     for(let i=0; i<data[0].length; i++) {
//         let card = document.createElement('a');
//         card.classList.add('videos__item', 'videos__item-active');
//         card.setAttribute('data-url', data[3][i]);
//         card.innerHTML = `
//         <img src="${data[0][i]}" alt="thumb">
//         <div class="videos__item-descr">
//             ${data[1][i]}
//         </div>
//         <div class="videos__item-views">
//             ${data[2][i]}
//         </div>
//         `;
//         videosWrapper.appendChild(card);
//         setTimeout(() => {
//             card.classList.remove('videos__item-active');
//         }, 10);
//         bindNewModal(card);
//         if (night===true) {
//             card.querySelector('.videos__item-descr').style.color = '#fff';
//             card.querySelector('.videos__item-views').style.color = '#fff';
//             card.querySelector('.videos__item img').style.boxShadow = '0 0 30px rgba(255, 255, 255, .50)';
               
//     }

//     sliceTitle('.videos__item-descr',99);
//     } 
// });

function start() {
    gapi.client.init({
        'apiKey': 'AIzaSyBSs5Duq0g0tqBrJ3qvoMeOU6wzQCHyR_I',
        'discoveryDocs': ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"]
    }).then(function(){
        return gapi.client.youtube.playlistItems.list({
            "part": "snippet,contentDetails",
            "maxResults": '6',
            "playlistId": "PL8AA4ED2A2112FE3D"
        });
    }).then(function(response){
        console.log(response.result);
        const videosWrapper = document.querySelector('.videos_wrapper');

        response.result.items.forEach(item =>{
            let card = document.createElement('a');

            card.classList.add('videos__item', 'videos__item-active');
            card.setAttribute('data-url', item.contentDetails.videoId);
                
            card.innerHTML = `
                <img src="${item.snippet.thumbnails.high.url}" alt="thumb">
                <div class="videos__item-descr">
                    ${item.snippet.title}
                </div>
                <div class="videos__item-views">
                    111111111
                </div>
               `;
               videosWrapper.appendChild(card);

               setTimeout(() => {
                card.classList.remove('videos__item-active');
               }, 10);
              bindNewModal(card);
             if (night===true) {
                card.querySelector('.videos__item-descr').style.color = '#fff';
                card.querySelector('.videos__item-views').style.color = '#fff';
                card.querySelector('.videos__item img').style.boxShadow = '0 0 30px rgba(255, 255, 255, .50)';
             } 
             
        }); 

        sliceTitle();
        bindModal(document.querySelectorAll('.videos_item'));
    }).catch(e => {
        console.log(e);
    });

}

more.addEventListener('click', () => {
    more.remove();
    gapi.load('client', start);
})

function sliceTitle(selector, count) {
    document.querySelectorAll(selector).forEach(item => {
        item.textContent.trim();
        if (item.textContent.length < count){
            return;
        } else {
            const str =  item.textContent.slice(0, count+1) + "...";
            item.textContent = str;
        }
    });

}

sliceTitle('.videos__item-descr',99);

function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
    player.stopVideo();
}

function bindModal(cards) {
    cards.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const id = item.getAttribute('data-url');
            loadVideo(id);
            openModal();
        });
    });
}
bindModal(videos);

function bindNewModal(cards) {
    cards.addEventListener('click', (e) => {
            e.preventDefault();
            const id = cards.getAttribute('data-url');
            loadVideo(id);
            openModal();
        
    });
}

modal.addEventListener('click', (e) => {
    if(!e.target.classList.contains('modal__body')) {
        closeModal();
    }
});

document.addEventListener('keydown', function(evt){if (evt.keyCode === 27) {closeModal(); } });

function createVideo(){
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    setTimeout(() => {
        player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: 'M7lc1UVf-VE',
    
          });
    }, 300); 
}

createVideo();

function loadVideo(id) {
    player.loadVideoById({'videoId':`${id}`});
}

// AIzaSyBSs5Duq0g0tqBrJ3qvoMeOU6wzQCHyR_I

