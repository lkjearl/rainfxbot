const { Telegraf } = require('telegraf')
const { Markup } = Telegraf
require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN)


// starting bot
bot.start((ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, 'Welcome! How can i help you today.',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Learn about Signal plans available", callback_data: "plans"}],
                [{text: "View Reviews & Tracked Records", callback_data: "reviews"}],
                [{text: "💸 Buy Signal plan", callback_data: "buy"}],
                [{text: "Contact live support for Help", callback_data: "support"}]
            ]
        }
    })
})


// restarting bot
bot.action('restart', (ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, 'Welcome! How can i help you today.',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Learn about Signal plans available", callback_data: "plans"}],
                [{text: "View Reviews & Tracked Records", callback_data: "reviews"}],
                [{text: "💸 Buy Signal plan", callback_data: "buy"}],
                [{text: "Contact live support for Help", callback_data: "support"}]
            ]
        }
    })
})


// reviews & records
bot.action('reviews', (ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, 'Check our reviews/ tracked records below!',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Fiverr", url: "fiverr.com"}],
                [{text: "Previous Months' Track Record", url: "facebook.com"}],
                [{text: "Return", callback_data: "restart"}]
            ]
        }
    })
})


// contact live support
bot.action('support', (ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, 'Redirecting you to support... (NOT WORKING) \nReplies may take up to 1 hour',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Return", callback_data: "restart"}]
            ]
        }
    })
})


// view plans
bot.action('plans', async (ctx) => {
    await ctx.reply('Here are the plans available:')
    await ctx.replyWithPhoto('https://static.wikia.nocookie.net/leagueoflegends/images/f/f4/Season_2019_-_Bronze_1.png/revision/latest/scale-to-width-down/112?cb=20181229234910')
    await ctx.replyWithPhoto('https://static.wikia.nocookie.net/leagueoflegends/images/7/70/Season_2019_-_Silver_1.png/revision/latest/scale-to-width-down/112?cb=20181229234936')
    await ctx.replyWithPhoto('https://static.wikia.nocookie.net/leagueoflegends/images/9/96/Season_2019_-_Gold_1.png/revision/latest/scale-to-width-down/112?cb=20181229234920')
    await ctx.telegram.sendMessage(ctx.chat.id, '\n\nKeen to know more about a plan? \n\nCheck out below: ',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "More Info on Bronze Tier", callback_data: "bronze_info"}],
                [{text: "More Info on Silver Tier", callback_data: "silver_info"}],
                [{text: "More Info on Gold Tier", callback_data: "gold_info"}]
            ]
        } 
    })
})


// plans details
bot.action('bronze_info', (ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, 'Full entitlements for Bronze tier plan: \n-...\n-...\n-...\n\n\nFor more info ask @yourmum',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Return", callback_data: "restart"}]
            ]
        }
    })
})
bot.action('silver_info', (ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, 'Full entitlements for Silver tier plan: \n-...\n-...\n-...\n\n\nFor more info ask @yourmum',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Return", callback_data: "restart"}]
            ]
        }
    })
})
bot.action('gold_info', (ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, 'Full entitlements for Gold tier plan: \n-...\n-...\n-...\n\n\nFor more info ask @yourmum',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Return", callback_data: "restart"}]
            ]
        }
    })
})


// buy confirmation
bot.action('buy', (ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, 'Pick your poison: ',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Bronze Tier", callback_data: "tier_bronze"}],
                [{text: "Silver Tier", callback_data: "tier_silver"}],
                [{text: "Gold Tier", callback_data: "tier_gold"}]
            ]
        }
    })
})


// order product
bot.action('tier_bronze', (ctx) => {
    console.log(`${ctx.from.first_name} is about to order Bronze Plan`)
    return ctx.replyWithInvoice(getBronzeInvoice(ctx.from.id))
})
bot.action('tier_silver', (ctx) => {
    console.log(`${ctx.from.first_name} is about to order Silver Plan`)
    return ctx.replyWithInvoice(getSilverInvoice(ctx.from.id))
})
bot.action('tier_gold', (ctx) => {
    console.log(`${ctx.from.first_name} is about to order Gold Plan`)
    return ctx.replyWithInvoice(getGoldInvoice(ctx.from.id))
})


// invoicing
const getBronzeInvoice = (id) => {
    const invoice = {
        chat_id: id,
        provider_token: process.env.PAYMENT_TOKEN,
        start_parameter: 'begun',
        title: 'Bronze Tier',
        description: 'Perfect for testing the waters.',
        currency: 'SGD',
        photo_url: 'https://static.wikia.nocookie.net/leagueoflegends/images/f/f4/Season_2019_-_Bronze_1.png/revision/latest/scale-to-width-down/112?cb=20181229234910',
        is_flexible: false,
        need_shipping_address: false,
        prices: [{label: 'Bronze Tier', amount: 2500}],
        payload: {
            unique_id: `${id}_${Number(new Date())}`,
            provider_token: process.env.PAYMENT_TOKEN
        }
    }
    return invoice
}
const getSilverInvoice = (id) => {
    const invoice = {
        chat_id: id,
        provider_token: process.env.PAYMENT_TOKEN,
        start_parameter: 'begun',
        title: 'Silver Tier',
        description: 'Best choice for average traders',
        currency: 'SGD',
        photo_url: 'https://static.wikia.nocookie.net/leagueoflegends/images/7/70/Season_2019_-_Silver_1.png/revision/latest/scale-to-width-down/112?cb=20181229234936',
        is_flexible: false,
        need_shipping_address: false,
        prices: [{label: 'Silver Tier', amount: 3500}],
        payload: {
            unique_id: `${id}_${Number(new Date())}`,
            provider_token: process.env.PAYMENT_TOKEN
        }
    }
    return invoice
}
const getGoldInvoice = (id) => {
    const invoice = {
        chat_id: id,
        provider_token: process.env.PAYMENT_TOKEN,
        start_parameter: 'begun',
        title: 'Gold Tier',
        description: 'Most premium option for avid traders',
        currency: 'SGD',
        photo_url: 'https://static.wikia.nocookie.net/leagueoflegends/images/9/96/Season_2019_-_Gold_1.png/revision/latest/scale-to-width-down/112?cb=20181229234920',
        is_flexible: false,
        need_shipping_address: false,
        prices: [{label: 'Gold Tier', amount: 5000}],
        payload: {
            unique_id: `${id}_${Number(new Date())}`,
            provider_token: process.env.PAYMENT_TOKEN
        }
    }
    return invoice
}


// payment callback
bot.on('pre_checkout_query', (ctx) => ctx.answerPreCheckoutQuery(true))
bot.on('successful_payment', async (ctx, next) => {
    console.log(`${ctx.from.first_name} (${ctx.from.username}) just paid ${ctx.message.successful_payment.total_amount / 100} $.`)
    await ctx.telegram.sendMessage('Successful Payment')
})


// launch bot
bot.launch()


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))