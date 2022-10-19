const path = require('path')
const withSass = require('@zeit/next-sass');
const withFonts = require('nextjs-fonts');
module.exports = withSass(withFonts({
    cssModules: true
}))
module.exports = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
}