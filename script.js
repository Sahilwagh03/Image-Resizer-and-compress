const uploadBox =document.querySelector('.upload-box'),
previewImg =uploadBox.querySelector('img'),
fileInput = uploadBox.querySelector('input')
widthInput = document.querySelector('.width input')
heightInput = document.querySelector('.height input')
ratioInput = document.querySelector('.ratio input')
qualityInput = document.querySelector('.quality input')
downdloadBtn = document.querySelector('.download-btn')

let ogImageRatio;


const loadfile = (e)=>{
    const file = e.target.files[0] //getting the first user selected file
    if(!file) return ;//return if user hasn't selected file
    previewImg.src=URL.createObjectURL(file)
    previewImg.addEventListener("load",()=>{
        widthInput.value=previewImg.naturalWidth //naturalWidth return the original width
        heightInput.value=previewImg.naturalHeight//naturalHeight return the original height
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight
        document.querySelector('.wrapper').classList.add('active')
    })
}

widthInput.addEventListener('keyup',()=>{
    const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
    heightInput.value=Math.floor(height);
})

heightInput.addEventListener('keyup',()=>{
    const width = ratioInput.checked ? heightInput.value * ogImageRatio : heightInput.value;
    widthInput.value=Math.floor(width);
})

const resizeAndDownload= ()=>{
    const canvas = document.createElement('canvas')
    const a = document.createElement('a')
    const ctx = canvas.getContext('2d')

    const imgQuality = qualityInput.checked ? 0.5 : 1.0 ;

    canvas.width = widthInput.value
    canvas.height = heightInput.value

    ctx.drawImage(previewImg,0,0,canvas.width,canvas.height)
    

    a.href = canvas.toDataURL('image/jpeg',imgQuality)
    a.download= new Date().getTime();
    a.click()

}


downdloadBtn.addEventListener('click',resizeAndDownload)
fileInput.addEventListener("change",loadfile)
uploadBox.addEventListener('click' ,()=> fileInput.click())