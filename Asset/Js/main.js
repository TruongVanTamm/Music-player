const $=document.querySelector.bind(document)
const $$=document.querySelectorAll.bind(document)
const PLAYER_STORAGE_KEY='Truong_Van_Tam'
const heading=$('header h2')
const cdThummb=$('.cd-thumb')
const audio=$('#audio')
const cd=$('.cd')
const cdthumbhole=$('.cd-thumb-hole')
const playBtn=$('.btn-toggle-play')
const player=$('.player')
const progress=$('.progress')
const nextBtn= $('.btn-next')
const prevBtn= $('.btn-prev')
const randomBtn= $('.btn-random')
const repeatBtn= $('.btn-repeat')
const playList = $('.playlist')

const app = {
    currentIndex: 0,
    isPlaying:false,
    isRandom: false,
    isRepeat:false,
    config: JSON.parse(localStorage.getItem( PLAYER_STORAGE_KEY)) || {} ,
    songs : [
        {
            name:'Blue Bird',
            Singer: 'Ikimono Gakari',
            path:'./Asset/music/Blue Bird - Ikimono Gakari.mp3',
            img:'./Asset/img/na (7).jpg'
        },
        {
            name:'Size Of The Moon',
            Singer: 'Nogizaka46',
            path:'./Asset/music/Size Of The Moon (月の大きさ)__Nogizaka46__128.mp3',
            img:'./Asset/img/na (5).jpg'
        },
        {
            name:'Closer',
            Singer: 'Inoue Joe',
            path:'./Asset/music/Closer - Inoue Joe.mp3',
            img:'./Asset/img/na (1).jpg'
        },
        {
            name:'Distance',
            Singer: 'Long Shot Party',
            path:'./Asset/music/Distance - Long Shot Party.mp3',
            img:'./Asset/img/na (2).jpg'
        },
        {
            name:'Diver',
            Singer: 'Nico Touches the Walls',
            path:'./Asset/music/Diver - Nico Touches the Walls.mp3',
            img:'./Asset/img/na (3).jpg'
        },
        {
            name:'Guren',
            Singer: 'Does',
            path:'./Asset/music/Guren - Does.mp3',
            img:'./Asset/img/na (4).jpg'
        },
        {
            name:'Hero_s Come Back',
            Singer: 'Does',
            path:'./Asset/music/Hero_s Come Back - Naruto.mp3',
            img:'./Asset/img/na (6).jpg'
        },
        {
            name:'Hotaru No Hikari',
            Singer: 'Ikimono Gakari',
            path:'./Asset/music/Hotaru No Hikari - Ikimono Gakari.mp3',
            img:'./Asset/img/na (8).jpg'
        },
        {
            name:'Kaze',
            Singer: 'Yamazaru',
            path:'./Asset/music/Kaze - Yamazaru.mp3',
            img:'./Asset/img/na (9).jpg'
        },
        {
            name:'Lovers',
            Singer: '7!!',
            path:'./Asset/music/Lovers - 7__.mp3',
            img:'./Asset/img/na (10).jpg'
        },
        {
            name:'Moshimo',
            Singer: 'Daisuke',
            path:'./Asset/music/Moshimo - Daisuke.mp3',
            img:'./Asset/img/na (11).jpg'
        },
        {
            name:'Newsong',
            Singer: 'Tacica',
            path:'./Asset/music/Newsong - Tacica.mp3',
            img:'./Asset/img/na (12).jpg'
        },
        {
            name:'Niwaka Ame ni mo Makezu ',
            Singer: 'NICO Touches',
            path:'./Asset/music/Niwaka Ame ni mo Makezu - NICO Touches t.mp3',
            img:'./Asset/img/na (13).jpg'
        },
        {
            name:'Sign',
            Singer: 'Flow',
            path:'./Asset/music/Sign - Flow.mp3',
            img:'./Asset/img/na (14).jpg'
        },
        {
            name:'Silhouette',
            Singer: 'Kana Boon',
            path:'./Asset/music/Silhouette - Kana Boon.mp3',
            img:'./Asset/img/na (15).jpg'
        },
        {
            name:'Totsugeki Rock',
            Singer: 'The Cro-Magnons',
            path:'./Asset/music/Totsugeki Rock - The Cro-Magnons.mp3',
            img:'./Asset/img/na (8).jpg'
        },
        {
            name:'Toumei Datta Sekai ',
            Singer: 'Hata Motohiro',
            path:'./Asset/music/Toumei Datta Sekai - Hata Motohiro.mp3',
            img:'./Asset/img/na (9).jpg'
        },
        
    ],
    setConfig: function(key, value){
        this.config[key] = value;
        localStorage.setItem( PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    render: function(){
        const htmls=this.songs.map((song ,index) => {
            return `
            <div class="song ${ index == this.currentIndex ? 'active' : ''}" data-index=${index}>
            <div class="thumb" style="background-image: url('${song.img}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.Singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
            </div>`
        })
        playList .innerHTML=htmls.join('')
    },
    defineProperty: function(){
        Object.defineProperty(this, 'currentSong',{
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function(){
        const _this=this
        const cdWidth=cd.offsetWidth

         const cdThummbanimate=  cdThummb.animate([
            {transform: 'rotate(360deg)'}
        ],{
            iterations: Infinity,
            duration:10000
        })
        cdThummbanimate.pause()
        document.onscroll=function(){
            const scrollY=window.scrollY
            const newCdWidth=cdWidth - scrollY
            cd.style.width=newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity=newCdWidth / cdWidth
        }
        playBtn.onclick=function(){
            if (_this.isPlaying){
                audio.pause()
            }
            else{
                audio.play()
            }
        }
        audio.onpause=function(){
            _this.isPlaying=false
            player.classList.remove('playing')
            cdThummbanimate.pause()
        }
        audio.onplay=function(){
            _this.isPlaying=true
            player.classList.add('playing')
            cdThummbanimate.play()
        }
        audio.ontimeupdate=function(){
            if (audio.duration){         
              const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
            progress.oninput=function(e){
                audio.pause();
                const seekTime= audio.duration*(e.target.value /100)
                audio.currentTime=seekTime
                
            }
            progress.onchange = function () {
                audio.play();
            }
        }
        nextBtn.onclick=function(){
            if (_this.isRandom){
                _this.randomSong()             
            }
            else{
             _this.nextSong()
            }
            audio.play();
            _this.render()
    
        }
        prevBtn.onclick=function(){
            if (_this.isRandom){
                _this.randomSong()
            }
            else{
                _this.prevSong()
            }
            audio.play();
            _this.render()
        }
        randomBtn.onclick=function(){
            _this.isRandom= !_this.isRandom
            _this.setConfig('isRandom',_this.isRandom)
            randomBtn.classList.toggle('active',_this.isRandom)
        
        }
        audio.onended=function(){
            if (_this.isRepeat){
                audio.play()
            }
            else{

                nextBtn.click()
            }
        }
        repeatBtn.onclick=function(){
            _this.isRepeat= !_this.isRepeat
            _this.setConfig('isRepeat',_this.isRepeat)
            repeatBtn.classList.toggle('active',_this.isRepeat)
        }
        playList.onclick = function(e){
            if (e.target.closest('.song:not(.active)') || e.target.closest('.option')){
                if (e.target.closest('.song:not(.active)')){
                   _this.currentIndex=e.target.closest('.song:not(.active)').
                   getAttribute('data-index')
                   _this.loadCurrentSong()
                   _this.render()
                   audio.play()
                }
            }
        }
    },
    loadCurrentSong: function(){
        heading.textContent=this.currentSong.name
        heading.animate(  [
            { opacity: 0 },
            { opacity: 1 },
          ], {
            duration: 600,
            iterations: 1
          })
        cdThummb.style.backgroundImage=`url('${this.currentSong.img}')`
        audio.src=this.currentSong.path 

    },
    loadConfig: function(){
        this.isRandom=this.config.isRandom
        this.isRepeat=this.config.isRepeat
    },
    randomSong: function(){
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        }
        while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    nextSong: function(){
        this.currentIndex ++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
        this.render()
        this.scrolltoActiveSong()
    },
    prevSong: function(){
        this.currentIndex --
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1 
        }
        this.loadCurrentSong()
        this.render()
        this.scrolltoActiveSong()
    },
    scrolltoActiveSong(){
        setTimeout(function(){
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block:'nearest'
            })
        },300)
    },
    start: function(){
        this.loadConfig()
        //DInh nghia thuoc tinh co obj
        this.defineProperty()
        //Lang nghe su kien
        this.handleEvents()
        this.loadCurrentSong()
        //Render playlist
        this.render()
        repeatBtn.classList.toggle('active',this.isRepeat)
        randomBtn.classList.toggle('active',this.isRandom)
    }
}

    app.start()