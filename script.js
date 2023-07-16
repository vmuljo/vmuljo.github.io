const themebtn = document.querySelector('.thememode');
const body = document.querySelector('body');
//color: #f05e31;

let root = document.documentElement;

themebtn.onclick = function(){
    if(!body.classList.contains('dark')){
        document.querySelector('meta[name="theme-color"]').setAttribute('content',  '#3b4352');
        body.classList.toggle('dark');
        body.classList.toggle('light');

        root.style.setProperty('--bg', '#3b4352');
        root.style.setProperty('--text', '#f2f3f7');
        root.style.setProperty('--emphasis', '#FDB927');
        root.style.setProperty('--hover', '#FDB927');
        root.style.setProperty('--icon', '#f2f3f7');

        document.querySelector('.cls-1').style.fill = '#f2f3f7';
        document.querySelector('.thememode i').classList.add('fa-sun');
        document.querySelector('.thememode i').classList.remove('fa-moon');

        return;
    }
    else{
        document.querySelector('meta[name="theme-color"]').setAttribute('content',  'white');
        body.classList.toggle('dark');
        body.classList.toggle('light');

        root.style.setProperty('--bg', 'white');
        root.style.setProperty('--text', '#3b4352');
        root.style.setProperty('--emphasis', '#315bf0');
        root.style.setProperty('--hover', '#315bf0');
        root.style.setProperty('--icon', '#3b4352');
        
        document.querySelector('.cls-1').style.fill = '#3b4352';
        document.querySelector('.thememode i').classList.add('fa-moon');
        document.querySelector('.thememode i').classList.remove('fa-sun');

        return;
    }
}