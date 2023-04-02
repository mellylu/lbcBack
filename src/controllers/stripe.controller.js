const Stripe = require('stripe')
const stripe = Stripe('sk_test_51KHlAcApycYj76sx6fysVoOPR551Ckuu8gRu8S4toPU6Rvu1wWEcjiyY6z71drC03GvtKGEB43pWfjVSm8aA36Lr009WbKxiT6')
//require("dotenv").config() pour mettre dans .env le chemin 

const createCheckoutSession = async(req, res) => {
    priceDataArray = [];
    console.log(req.body)
    const line_items = req.body.forEach((item) => {
        priceDataArray.push({
            price_data: {
                currency: "usd",
                unit_amount: item.price * 100,
                product_data: {
                    name: item.name,
                },
            },
            quantity:1
        })   
    })

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: priceDataArray,
        mode: 'payment',
        success_url: 'http://localhost:3000/Checkoutsuccess',
        cancel_url: 'http://localhost:3000/Cart',
    });
    return session;
};

exports.createSession = async function (req, res) {
    try {
      const session = await createCheckoutSession(req);
      console.log(session)
      res.status(200).json({
        id: session.id,
        price: session.amout_total,
        currency: session.currency,
        url: session.url,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  };