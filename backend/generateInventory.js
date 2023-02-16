
exports.run = async (client) => {
    try {
        const db = client.db('inventory');
        // const coll = db.collection('brands');
        // const ans =await coll.insertMany([{name:"Nike"},{name:"Adidas"},{name:"New Balance"},{name:"Puma"},{name:"Converse"},{name:"Reebok"},{name:"Yonex"}]);

        // const coll = db.collection('sizes');
        // await coll.insertMany([{size:38},{size:38.5},{size:39},{size:39.5},{size:40},{size:40.5},{size:41},{size:41.5},{size:42},{size:42.5},{size:43}]);

        // const coll = db.collection('shoe_model');
        // await coll.insertMany([
        //     {model:"Swish swosh", brand: '63dbbaa02dee1b02d09a1d41', description: "Adequate for running in rough conditions. Resistant to rain."},
        //     {model:"Antarctic Gel", brand: '63dbbaa02dee1b02d09a1d42', description: "Lightweight and very comfortable."},
        //     {model:"Sole Reaper", brand: '63dbbaa02dee1b02d09a1d43', description: "You'll run even faster with those. Comes with next-gen laces"},
        //     {model:"Tony Frosties", brand: '63dbbaa02dee1b02d09a1d43', description: "They're greeeeeeeat! For running."},
        //     {model:"Bad Ington", brand: '63dbbaa02dee1b02d09a1d47', description: "You won't bear(...) wearing other shoes after trying these ones."},
        //     {model:"Lightning rod", brand: '63dbbaa02dee1b02d09a1d46', description: ""},
        // ]);

        // const coll = db.collection('coat_model');
        // await coll.insertMany([
        //     {model:"Avokaut", brand: '63dbbaa02dee1b02d09a1d41', description: "Very warm for winter."},
        //     {model:"Heumni", brand: '63dbbaa02dee1b02d09a1d42', description: ""},
        //     {model:"Nephroe", brand: '63dbbaa02dee1b02d09a1d44', description: "Re-inforced zipper"},
        //     {model:"Sharkette", brand: '63dbbaa02dee1b02d09a1d43', description: "Comes with an removable hood."},
        //     {model:"Dustbla", brand: '63dbbaa02dee1b02d09a1d45', description: ""},
        //     {model:"Relancor", brand: '63dbbaa02dee1b02d09a1d47', description: ""},
        // ]);

        const coll = db.collection('coat_instance');
        await coll.insertMany([
            {model:"63dbccfcacd59a55b0725124", size: "M"},
            {model:"63dbccfcacd59a55b0725124", size: "M"},
            {model:"63dbccfcacd59a55b0725124", size: "M"},
            {model:"63dbccfcacd59a55b0725124", size: "L"},
            {model:"63dbccfcacd59a55b0725124", size: "L"},

            {model:"63dbccfcacd59a55b0725125", size: "M"},
            {model:"63dbccfcacd59a55b0725125", size: "M"},
            {model:"63dbccfcacd59a55b0725125", size: "M"},
            {model:"63dbccfcacd59a55b0725125", size: "L"},
            {model:"63dbccfcacd59a55b0725125", size: "L"},

            {model:"63dbccfcacd59a55b0725126", size: "M"},
            {model:"63dbccfcacd59a55b0725126", size: "M"},
            {model:"63dbccfcacd59a55b0725126", size: "M"},
            {model:"63dbccfcacd59a55b0725126", size: "L"},
            {model:"63dbccfcacd59a55b0725126", size: "L"},

            {model:"63dbccfcacd59a55b0725127", size: "M"},
            {model:"63dbccfcacd59a55b0725127", size: "M"},
            {model:"63dbccfcacd59a55b0725127", size: "M"},
            {model:"63dbccfcacd59a55b0725127", size: "L"},
            {model:"63dbccfcacd59a55b0725127", size: "L"},

            {model:"63dbccfcacd59a55b0725128", size: "M"},
            {model:"63dbccfcacd59a55b0725128", size: "M"},
            {model:"63dbccfcacd59a55b0725128", size: "M"},
            {model:"63dbccfcacd59a55b0725128", size: "L"},
            {model:"63dbccfcacd59a55b0725128", size: "L"},

            {model:"63dbccfcacd59a55b0725129", size: "M"},
            {model:"63dbccfcacd59a55b0725129", size: "M"},
            {model:"63dbccfcacd59a55b0725129", size: "M"},
            {model:"63dbccfcacd59a55b0725129", size: "L"},
            {model:"63dbccfcacd59a55b0725129", size: "L"},

        ]);

        // const coll = db.collection('shirt_model');
        // await coll.insertMany([
        //     {model:"Lagoon", brand: '63dbbaa02dee1b02d09a1d41', description: "Very comfy."},
        //     {model:"Shard", brand: '63dbbaa02dee1b02d09a1d42', description: "Suitable for all seasons."},
        //     {model:"West Virginia", brand: '63dbbaa02dee1b02d09a1d43', description: "Country roads, take me home."},
        //     {model:"Decker", brand: '63dbbaa02dee1b02d09a1d43', description: ""},
        //     {model:"Perrin", brand: '63dbbaa02dee1b02d09a1d47', description: "Long sleeved."},
        //     {model:"Casir", brand: '63dbbaa02dee1b02d09a1d46', description: ""},
        // ]);

        // const coll = db.collection('shirt_instance');
        // await coll.insertMany([
        //     {model:"63dbc72dccc4da746d1f758d", size: "M"},
        //     {model:"63dbc72dccc4da746d1f758d", size: "M"},
        //     {model:"63dbc72dccc4da746d1f758d", size: "M"},
        //     {model:"63dbc72dccc4da746d1f758d", size: "S"},
        //     {model:"63dbc72dccc4da746d1f758d", size: "S"},
        //     {model:"63dbc72dccc4da746d1f758d", size: "XL"},
        //     {model:"63dbc72dccc4da746d1f758d", size: "XL"},

        //     {model:"63dbc72dccc4da746d1f758e", size: "XS"},
        //     {model:"63dbc72dccc4da746d1f758e", size: "S",},
        //     {model:"63dbc72dccc4da746d1f758e", size: "S",},
        //     {model:"63dbc72dccc4da746d1f758e", size: "M"},
        //     {model:"63dbc72dccc4da746d1f758e", size: "M"},
        //     {model:"63dbc72dccc4da746d1f758e", size: "M"},
        //     {model:"63dbc72dccc4da746d1f758e", size: "L"},
        //     {model:"63dbc72dccc4da746d1f758e", size: "L"},

        //     {model:"63dbc72dccc4da746d1f758f", size: "M"},
        //     {model:"63dbc72dccc4da746d1f758f", size: "M"},
        //     {model:"63dbc72dccc4da746d1f758f", size: "L"},
        //     {model:"63dbc72dccc4da746d1f758f", size: "L"},
        //     {model:"63dbc72dccc4da746d1f758f", size: "L"},
        //     {model:"63dbc72dccc4da746d1f758f", size: "XL"},
        //     {model:"63dbc72dccc4da746d1f758f", size: "XL"},
        //     {model:"63dbc72dccc4da746d1f758f", size: "XL"},

        //     {model:"63dbc72dccc4da746d1f7590", size: "XS"},
        //     {model:"63dbc72dccc4da746d1f7590", size: "XS"},
        //     {model:"63dbc72dccc4da746d1f7590", size: "XS"},
        //     {model:"63dbc72dccc4da746d1f7590", size: "S"},
        //     {model:"63dbc72dccc4da746d1f7590", size: "S"},
        //     {model:"63dbc72dccc4da746d1f7590", size: "M"},
        //     {model:"63dbc72dccc4da746d1f7590", size: "M"},
        //     {model:"63dbc72dccc4da746d1f7590", size: "M"},

        //     {model:"63dbc72dccc4da746d1f7591", size: "S"},
        //     {model:"63dbc72dccc4da746d1f7591", size: "S"},
        //     {model:"63dbc72dccc4da746d1f7591", size: "S"},
        //     {model:"63dbc72dccc4da746d1f7591", size: "L"},
        //     {model:"63dbc72dccc4da746d1f7591", size: "L"},
        //     {model:"63dbc72dccc4da746d1f7591", size: "L"},
        //     {model:"63dbc72dccc4da746d1f7591", size: "L"},

        //     {model:"63dbc72dccc4da746d1f7592", size: "S"},
        //     {model:"63dbc72dccc4da746d1f7592", size: "S"},
        //     {model:"63dbc72dccc4da746d1f7592", size: "S"},
        //     {model:"63dbc72dccc4da746d1f7592", size: "M"},
        //     {model:"63dbc72dccc4da746d1f7592", size: "M"},
        //     {model:"63dbc72dccc4da746d1f7592", size: "M"},
        //     {model:"63dbc72dccc4da746d1f7592", size: "M"},
        //     {model:"63dbc72dccc4da746d1f7592", size: "L"},
        //     {model:"63dbc72dccc4da746d1f7592", size: "L"},
        //     {model:"63dbc72dccc4da746d1f7592", size: "L"},
        //     {model:"63dbc72dccc4da746d1f7592", size: "XL"},
        //     {model:"63dbc72dccc4da746d1f7592", size: "XL"},
        //     {model:"63dbc72dccc4da746d1f7592", size: "XL"},
        // ]);

        // const coll = db.collection('shoe_instance');
        // await coll.insertMany([
        //     {model:"63dbc2b90a6ed09bb19105d0", size: 38},
        //     {model:"63dbc2b90a6ed09bb19105d0", size: 38},
        //     {model:"63dbc2b90a6ed09bb19105d0", size: 38.5},
        //     {model:"63dbc2b90a6ed09bb19105d0", size: 39},
        //     {model:"63dbc2b90a6ed09bb19105d0", size: 39},
        //     {model:"63dbc2b90a6ed09bb19105d0", size: 39},
        //     {model:"63dbc2b90a6ed09bb19105d0", size: 39.5},
        //     {model:"63dbc2b90a6ed09bb19105d0", size: 39.5},

        //     {model:"63dbc2b90a6ed09bb19105d1", size: 40},
        //     {model:"63dbc2b90a6ed09bb19105d1", size: 40},
        //     {model:"63dbc2b90a6ed09bb19105d1", size: 40},
        //     {model:"63dbc2b90a6ed09bb19105d1", size: 40},
        //     {model:"63dbc2b90a6ed09bb19105d1", size: 40},
        //     {model:"63dbc2b90a6ed09bb19105d1", size: 41.5},
        //     {model:"63dbc2b90a6ed09bb19105d1", size: 41.5},
        //     {model:"63dbc2b90a6ed09bb19105d1", size: 41.5},
        //     {model:"63dbc2b90a6ed09bb19105d1", size: 43},
        //     {model:"63dbc2b90a6ed09bb19105d1", size: 43},
        //     {model:"63dbc2b90a6ed09bb19105d1", size: 43},
        //     {model:"63dbc2b90a6ed09bb19105d1", size: 43},

        //     {model:"63dbc2b90a6ed09bb19105d2", size: 41.5},
        //     {model:"63dbc2b90a6ed09bb19105d2", size: 41.5},
        //     {model:"63dbc2b90a6ed09bb19105d2", size: 42.5},
        //     {model:"63dbc2b90a6ed09bb19105d2", size: 42.5},
        //     {model:"63dbc2b90a6ed09bb19105d2", size: 42.5},
        //     {model:"63dbc2b90a6ed09bb19105d2", size: 43},
        //     {model:"63dbc2b90a6ed09bb19105d2", size: 43},
        //     {model:"63dbc2b90a6ed09bb19105d2", size: 43},
        //     {model:"63dbc2b90a6ed09bb19105d2", size: 44},
        //     {model:"63dbc2b90a6ed09bb19105d2", size: 44},
        //     {model:"63dbc2b90a6ed09bb19105d2", size: 44},

        //     {model:"63dbc2b90a6ed09bb19105d3", size: 37.5},
        //     {model:"63dbc2b90a6ed09bb19105d3", size: 37.5},
        //     {model:"63dbc2b90a6ed09bb19105d3", size: 37.5},
        //     {model:"63dbc2b90a6ed09bb19105d3", size: 38},
        //     {model:"63dbc2b90a6ed09bb19105d3", size: 38},
        //     {model:"63dbc2b90a6ed09bb19105d3", size: 38},
        //     {model:"63dbc2b90a6ed09bb19105d3", size: 38},
        //     {model:"63dbc2b90a6ed09bb19105d3", size: 38},

        //     {model:"63dbc2b90a6ed09bb19105d4", size: 40},
        //     {model:"63dbc2b90a6ed09bb19105d4", size: 40},
        //     {model:"63dbc2b90a6ed09bb19105d4", size: 40},
        //     {model:"63dbc2b90a6ed09bb19105d4", size: 41.5},
        //     {model:"63dbc2b90a6ed09bb19105d4", size: 41.5},
        //     {model:"63dbc2b90a6ed09bb19105d4", size: 41.5},
        //     {model:"63dbc2b90a6ed09bb19105d4", size: 42},
        //     {model:"63dbc2b90a6ed09bb19105d4", size: 42},
        //     {model:"63dbc2b90a6ed09bb19105d4", size: 42},
        //     {model:"63dbc2b90a6ed09bb19105d4", size: 42},

        //     {model:"63dbc2b90a6ed09bb19105d5", size: 39.5},
        //     {model:"63dbc2b90a6ed09bb19105d5", size: 39.5},
        //     {model:"63dbc2b90a6ed09bb19105d5", size: 39.5},
        //     {model:"63dbc2b90a6ed09bb19105d5", size: 39.5},
        //     {model:"63dbc2b90a6ed09bb19105d5", size: 40},
        //     {model:"63dbc2b90a6ed09bb19105d5", size: 40},
        //     {model:"63dbc2b90a6ed09bb19105d5", size: 40},
        //     {model:"63dbc2b90a6ed09bb19105d5", size: 40},
        //     {model:"63dbc2b90a6ed09bb19105d5", size: 41},
        //     {model:"63dbc2b90a6ed09bb19105d5", size: 41},
        //     {model:"63dbc2b90a6ed09bb19105d5", size: 41},
        //     {model:"63dbc2b90a6ed09bb19105d5", size: 41},
        // ]);

    } catch(e) {
        console.error('e: ', e);
    }
}