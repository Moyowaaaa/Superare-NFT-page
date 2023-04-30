import showcaseImageOne from '../../assets/images/showcase1.png'
import showcaseImageTwo from '../../assets/images/showcase2.png'
import showcaseImageThree from '../../assets/images/showcase3.png'
import polySansBold from '../../assets/fonts/PolySans-Bold.ttf'
import circularBold from '../../assets/fonts/CircularStd-Bold.ttf'
import circular from '../../assets/fonts/CircularStd-Medium.ttf'
import robotoLight from '../../assets/fonts/Roboto-Light.ttf'
import polysans from '../../assets/fonts/PolySans.ttf'
import polysansMedium from '../../assets/fonts/PolySans-Bold.ttf'
import roboto from '../../assets/fonts/Roboto-Regular.ttf'


const loadImages = ([showcaseImageOne,showcaseImageTwo,showcaseImageThree])

const fonts = [polySansBold,polysans,polysansMedium,circular,circularBold,roboto,robotoLight]


export const assetsLoading = () => {
    var assestsLoaded = false

   
    const promises:any = []
    const loadImages = ([showcaseImageOne,showcaseImageTwo,showcaseImageThree])
    
    loadImages.forEach((asset) => {
        const img = new Image()
        img.src = asset

        promises.push(new Promise((resolve, reject) => {
            img.onload = resolve
            img.onerror = reject
          }))        
    })
    
    Promise.all(promises).then(() => {
      assestsLoaded = true
      })


      return assestsLoaded


}








// new Promise((resolve,reject)