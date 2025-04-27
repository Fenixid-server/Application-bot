module.exports = {
    autoLikeStatus: process.env.AUTO_LIKE_STATUS === 'true',
    downloadMediaStatus: process.env.DOWNLOAD_MEDIA_STATUS === 'true',
    sensorNumber: process.env.SENSOR_NUMBER === 'true',
    sendWelcomeMessage: process.env.SEND_WELCOME_MESSAGE === 'true',

    blackList: process.env.BLACK_LIST ? process.env.BLACK_LIST.split(',') : [],
    whiteList: process.env.WHITE_LIST ? process.env.WHITE_LIST.split(',') : [],

    fenixaboutype: process.env.FENIX_ABOUT_TYPE || 'Programming',
    ownerNumber: process.env.OWNER_NUMBER || '94773010580',
    userTimezone: process.env.USER_TIMEZONE || 'Asia/Colombo',
    FenixName: process.env.FENIX_NAME || 'Unknown Friend',

    // Group contact push
    fenixwel1: process.env.FENIX_WEL_1 || 'Your Number Has Been Auto Saved🫠',
    fenixwel2: process.env.FENIX_WEL_2 || 'Save And Alert Me If Save 🌹',
    fenixwel3: process.env.FENIX_WEL_3 || 'Save and Alert me✅',

    // Bot details
    botDetails: {
        botName: process.env.BOT_NAME || 'FENX ID OWNER',
        botAge: process.env.BOT_AGE || '26',
        botLocation: process.env.BOT_LOCATION || 'SRILANKA',
        botEmail: process.env.BOT_EMAIL || 'privateloginemails@gmail.com',
    },
};