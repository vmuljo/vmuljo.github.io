var themebtn = document.querySelector('.thememode');
var body = document.querySelector('body');
//color: #f05e31;
function themeColorHover(){
    if(!body.classList.contains('dark')){
        document.getElementById('themeicon').onmouseenter = function(){
            document.querySelector('.thememode i').style.color = '#315bf0';
        }
        document.getElementById('themeicon').onmouseleave = function(){
            document.querySelector('.thememode i').style.color = '#3b4352';
        }
    }
    if(body.classList.contains('dark')){
        document.getElementById('themeicon').onmouseenter = function(){
            document.querySelector('.thememode i').style.color = '#f05e31';
        }
        document.getElementById('themeicon').onmouseleave = function(){
            document.querySelector('.thememode i').style.color = '#f2f3f7';
        }
    }
}
themeColorHover();

themebtn.onclick = function(){
    if(!body.classList.contains('dark')){
        document.querySelector('meta[name="theme-color"]').setAttribute('content',  '#3b4352');
        body.classList.toggle('dark');
        document.querySelector('body').style.backgroundColor = '#3b4352';
        document.querySelector('body').style.color = '#f2f3f7';
        document.querySelector('.navbar').style.backgroundColor = '#3b4352';
        document.querySelector('#name').style.color = '#f05e31';
        document.querySelectorAll('.fa-brands').forEach(element =>{
            element.style.color = '#f2f3f7';
        })
        document.querySelectorAll('.vl').forEach(element => {
            element.style.borderLeft = '2.3px solid #f2f3f7';
        })
        document.querySelector('.cls-1').style.fill = '#f2f3f7';
        document.querySelectorAll('button').forEach(element => {
            element.style.backgroundColor = '#3b4352';
        })
        document.querySelectorAll('.linkbutton').forEach(element => {
            element.style.color = '#f2f3f7';
            element.style.border = '2px solid #f05e31';
        })
        // document.querySelector('#nav a').style.color = '#f2f3f7';
        document.querySelectorAll('#nav a').forEach(element => {
            element.style.color = '#f2f3f7';
        })
        document.querySelector('.thememode').style.boxShadow = '#0px 0px 0px 1.5px #f2f3f7';
        document.querySelector('.thememode i').style.color = '#f2f3f7';

        document.querySelector('.thememode i').classList.add('fa-sun');
        document.querySelector('.thememode i').classList.remove('fa-moon');

        themeColorHover();
        return;
        // document.querySelector('.fa-solid').classList.add('fa-sun');
    }
    else{
        document.querySelector('meta[name="theme-color"]').setAttribute('content',  'white');
        body.classList.toggle('dark');
        document.querySelector('body').style.backgroundColor = 'white';
        document.querySelector('body').style.color = '#3b4352';
        document.querySelector('.navbar').style.backgroundColor = 'white';
        document.querySelector('#name').style.color = '#315bf0';
        document.querySelectorAll('.fa-brands').forEach(element =>{
            element.style.color = '#3b4352';
        })
        document.querySelector('.vl').style.borderLeft = '2.3px solid #3b4352';
        document.querySelector('.cls-1').style.fill = '#3b4352';
        document.querySelectorAll('button').forEach(element => {
            element.style.backgroundColor = '#f2f3f7';
        })
        document.querySelectorAll('.linkbutton').forEach(element => {
            element.style.color = '#3b4352';
            element.style.border = '2px solid #315bf0';
        })
        // document.querySelector('#nav a').style.color = '#f2f3f7';
        document.querySelectorAll('#nav a').forEach(element => {
            element.style.color = '#3b4352';
        })
        document.querySelector('.thememode i').style.color = '#3b4352';

        document.querySelector('.thememode i').classList.add('fa-moon');
        document.querySelector('.thememode i').classList.remove('fa-sun');

        themeColorHover()
        return;
        // document.querySelector('.fa-solid').classList.add('fa-sun');
    }
}