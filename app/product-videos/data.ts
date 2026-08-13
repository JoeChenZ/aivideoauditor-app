// Data layer for the per-industry use-case landing pages (/product-videos/[industry]).
// Each vertical has hand-authored, distinct copy — NOT templated. The goal is a
// genuine landing page per vertical that ranks for "ai product videos for {industry}"
// and converts to /order. Video ids reference data/prompt-gallery.json.

export type FAQ = { q: string; a: string };

export type Vertical = {
  slug: string;
  industry: string; // label used in copy, e.g. "Jewelry"
  h1: string;
  subhead: string;
  metaDescription: string; // ~150 chars
  painPoints: { title: string; body: string }[]; // 3, specific to the vertical
  solution: string; // how AVA solves it, tied to photo→post flow + consistency QC
  faqs: FAQ[]; // 3
  videoIds: string[]; // 3-6 ids from prompt-gallery.json
};

export const VERTICALS: Vertical[] = [
  {
    slug: 'jewelry',
    industry: 'Jewelry',
    h1: 'AI Product Videos for Jewelry Brands',
    subhead:
      'Turn a single studio photo of a ring, pearl, or pendant into a shimmering 9:16 clip for Reels and TikTok — without a lightbox, a macro rig, or a videographer.',
    metaDescription:
      'Done-for-you AI product videos for jewelry brands. Send one photo of your ring or pearl set — get a QC-checked 9:16 Reel in 2–3 days. From $59.',
    painPoints: [
      {
        title: 'Metal and gemstones are brutal to film',
        body: "Rings blow out under a phone light, diamonds catch reflections of your whole room, and pearls look flat unless you nail the angle. Most small jewelers give up and post a static flatlay that scrolls right past.",
      },
      {
        title: 'AI generators warp the stone',
        body: 'Feed a piece into a generic text-to-video tool and the prongs shift, the carat count changes, and the setting morphs mid-clip. For jewelry, a product that changes shape on screen is worse than no video at all.',
      },
      {
        title: 'You need volume, not one hero shot',
        body: "A jewelry drop is a dozen SKUs. Filming each one properly is a full day you don't have, so new arrivals sit in the shop with no motion content to push them.",
      },
    ],
    solution:
      "Send us a clean photo of the piece — a ring on white, a pearl set, an earring flatlay. We animate it into a slow rotating, light-catching 9:16 clip and run every frame through a consistency gate so the stone count, setting, and metal never drift. You approve a preview, then get platform-native files for IG Reels, TikTok, and 小紅書 in 2–3 days. Ship a whole collection's worth of motion without touching a camera.",
    faqs: [
      {
        q: 'Will the diamond or pearl look real, or plasticky?',
        a: 'We prompt and QC specifically for material fidelity — the facets catch light, pearls keep their lustre, and metal reads as metal. Because we start from your real product photo, the piece on screen is the piece you sell.',
      },
      {
        q: 'Can you show the piece on a model without a photoshoot?',
        a: "Yes. We can animate an on-model reveal from your product photo, or work from an existing lifestyle shot. If exact hand/skin realism matters to you, tell us and we'll steer the QC toward on-model consistency.",
      },
      {
        q: 'I have a 12-piece collection. Can you do all of them?',
        a: 'That\'s exactly the use case. Send the photos as a batch — our multi-video packs (3-pack $149, 5-pack $229) are built for drops, and you get one preview round and a revision on each.',
      },
    ],
    videoIds: [
      'ava-pearl-drop-earrings',
      'ava-peach-pearl-set',
      'ava-grey-pearl-studs',
      'ava-flatlay-to-motion',
      'veo3-wild-pearl-reveal',
      'veo3-found-not-made',
    ],
  },
  {
    slug: 'skincare-beauty',
    industry: 'Skincare & Beauty',
    h1: 'AI Product Videos for Skincare & Beauty Brands',
    subhead:
      'Turn a serum bottle or compact photo into a glossy, texture-forward 9:16 clip that sells the feel of the product — no studio, no hand model, no reshoot.',
    metaDescription:
      'Done-for-you AI product videos for skincare and beauty brands. One product photo → a QC-checked 9:16 Reel showing texture and glow in 2–3 days. From $59.',
    painPoints: [
      {
        title: 'Texture is the sale, and photos kill it',
        body: 'The whole pitch for a cream or serum is how it feels — the glide, the dewy finish, the droplet on glass. A flat product photo throws all of that away, and shooting slow-motion texture properly needs a macro lens and lighting you don\'t have.',
      },
      {
        title: 'Label and bottle keep mutating',
        body: 'Generic AI video tools rewrite your label into gibberish and reshape the bottle every few frames. For a beauty brand where the packaging IS the brand, that\'s unusable.',
      },
      {
        title: 'The content treadmill never stops',
        body: 'Beauty lives on Reels and TikTok, which means you need fresh motion content every week, not one launch video. Keeping up with a phone and a ring light burns hours you should be spending on the actual product.',
      },
    ],
    solution:
      "Send a clean photo of the bottle, jar, or compact. We produce a texture-forward 9:16 clip — think glide, droplet, glow, a slow product turn — and run a consistency gate so your label stays legible and your bottle keeps its exact shape frame to frame. Approve the preview, get IG Reels / TikTok / 小紅書 exports in 2–3 days. Refresh your feed on a cadence without ever setting up a shoot.",
    faqs: [
      {
        q: 'Will my label and brand name stay readable?',
        a: 'Yes — keeping packaging and text intact is the single most common failure of generic AI video, and it\'s exactly what our consistency QC checks for before we send anything.',
      },
      {
        q: 'Can you show the product texture, like a cream swatch or serum drop?',
        a: 'That\'s a core request for beauty. Tell us the effect you want — a droplet on glass, a swatch smear, a dewy finish — and we prompt the clip toward that texture moment.',
      },
      {
        q: 'How fresh can I keep my feed with this?',
        a: 'At 2–3 days per batch and $59 a video, most beauty brands run a small pack every couple of weeks. It\'s built to feed a posting cadence, not just a one-off launch.',
      },
    ],
    videoIds: [
      'ava-flatlay-to-motion',
      'sora-closeup-of-womans-eye',
      'runway-macro-shot-to-the-face-freckles-of-a-young-wo',
      'luma-crystal-bloom',
      'hailuo-koi-pond',
    ],
  },
  {
    slug: 'candles',
    industry: 'Candles',
    h1: 'AI Product Videos for Candle Brands',
    subhead:
      'Turn a photo of your candle into a warm, flickering 9:16 clip — the flame, the melt pool, the mood — without lighting one on camera or burning through inventory.',
    metaDescription:
      'Done-for-you AI product videos for candle makers. One photo → a cozy 9:16 Reel with flame and glow, QC-checked so the label never warps. 2–3 days, from $59.',
    painPoints: [
      {
        title: 'A candle sells a mood a photo can\'t hold',
        body: 'The magic of a candle is the flicker, the glow across the room, the melt pool forming. A still photo captures none of it, and filming a real flame well means a dark room, a tripod, and a lot of takes.',
      },
      {
        title: 'You\'re literally burning stock to film',
        body: 'Every filming session lights a candle you can\'t then sell as new. For a small maker with limited pours, that\'s real margin going up in smoke for content that may not even land.',
      },
      {
        title: 'AI tools mangle the jar and label',
        body: 'Drop your candle into a generic generator and the vessel changes shape, the wax color shifts, and your carefully designed label turns to mush — the opposite of the crafted, cozy feel you\'re selling.',
      },
    ],
    solution:
      "Send one photo of your candle — lit or unlit. We generate a warm, atmospheric 9:16 clip with a believable flame and glow, and run a consistency gate so the jar shape, wax color, and label stay exactly as they are. You approve the preview and get IG Reels / TikTok / 小紅書 files in 2–3 days. No dark-room shoots, and no burning inventory to make content.",
    faqs: [
      {
        q: 'Can you make the flame and glow look real?',
        a: 'Yes — a believable flicker and warm ambient glow are the whole point for candles, and we prompt and QC toward exactly that cozy, lived-in feel.',
      },
      {
        q: 'Will the jar and my label stay the same?',
        a: 'They will. Vessel shape, wax color, and label legibility are checked by our consistency gate before delivery — your product on screen matches your product on the shelf.',
      },
      {
        q: 'I hand-pour small batches. Is this worth it for me?',
        a: 'Especially for you — you stop burning sellable stock to film, and at $59 a clip you can give each scent its own moody Reel without a studio.',
      },
    ],
    videoIds: [
      'sora-monster-with-melting-candle',
      'luma-crystal-bloom',
      'pika-coffee-pour',
      'hailuo-koi-pond',
      'runway-an-oil-painting-of-a-natural-forest-environme',
    ],
  },
  {
    slug: 'ceramics-pottery',
    industry: 'Ceramics & Pottery',
    h1: 'AI Product Videos for Ceramics & Pottery Brands',
    subhead:
      'Turn a photo of a mug, vase, or bowl into a slow, tactile 9:16 clip that shows the form, glaze, and hand-made detail — no turntable, no studio, no reshoot.',
    metaDescription:
      'Done-for-you AI product videos for ceramic and pottery makers. One photo → a QC-checked 9:16 Reel showing glaze and form in 2–3 days. From $59.',
    painPoints: [
      {
        title: 'Form and glaze need to move to sell',
        body: 'A wheel-thrown mug or reactive-glaze vase is a 3D object — the whole appeal is the silhouette turning and the light rolling across the glaze. A single photo flattens it into just another cup.',
      },
      {
        title: 'Studio turntables are a pain for one person',
        body: 'Getting a clean 360 of a handmade piece means a turntable, even lighting, and a locked-off camera. For a solo potter, that setup for every new piece is time at the wheel you\'re giving up.',
      },
      {
        title: 'Generic AI reshapes handmade imperfection',
        body: 'The slight wobble and hand-finished edge is the value of a handmade piece — but generic AI video "corrects" it into a sterile mass-produced shape, erasing the exact thing customers pay for.',
      },
    ],
    solution:
      "Send a photo of the piece against a simple background. We produce a slow, tactile 9:16 clip — a gentle turn, light rolling across the glaze, the form revealed — and run a consistency gate so the silhouette and glaze read true and the hand-made character is preserved, not sanded away. Approve the preview, get IG Reels / TikTok / 小紅書 exports in 2–3 days.",
    faqs: [
      {
        q: 'Will my glaze color and finish come through accurately?',
        a: 'Yes. Because we start from your real photo and QC against it, the glaze color, sheen, and finish on screen match the actual piece — reactive and speckled glazes included.',
      },
      {
        q: 'Can it do a rotating / turntable-style shot without me building one?',
        a: 'That\'s the most-requested shot for ceramics and exactly what this replaces — a smooth turn that shows the full form, generated from one still.',
      },
      {
        q: 'I sell one-of-a-kind pieces. Does that work here?',
        a: 'It\'s ideal. Each piece gets its own clip from its own photo, so unique and small-batch work each get real motion content without a per-piece studio session.',
      },
    ],
    videoIds: [
      'runway-a-pencil-drawing-an-architectural-plan',
      'ava-flatlay-to-motion',
      'luma-crystal-bloom',
      'kling-chef-plating',
      'hailuo-koi-pond',
    ],
  },
  {
    slug: 'fashion-apparel',
    industry: 'Fashion & Apparel',
    h1: 'AI Product Videos for Fashion & Apparel Brands',
    subhead:
      'Turn a flatlay or product shot into a moving 9:16 clip with drape, motion, and attitude — the kind of Reel that sells fit — without booking a model or a set.',
    metaDescription:
      'Done-for-you AI product videos for fashion and apparel brands. One photo → a QC-checked 9:16 Reel with real drape and motion in 2–3 days. From $59.',
    painPoints: [
      {
        title: 'Clothes only sell when they move',
        body: 'Drape, flow, how a fabric catches light as it moves — that\'s what converts on a garment, and a flat lay or hanger shot shows none of it. But a real shoot means a model, a stylist, a location, and a budget most small labels don\'t have.',
      },
      {
        title: 'AI video melts prints and seams',
        body: 'Generic text-to-video smears logos, warps stripes, and dissolves seam lines and hems. For apparel, where the pattern and cut are the product, that\'s an instant no.',
      },
      {
        title: 'Every drop needs its own content',
        body: 'Fashion moves in drops and seasons, each with a dozen pieces. Producing fresh video for every SKU on a small-brand budget is the bottleneck between design and selling.',
      },
    ],
    solution:
      "Send a flatlay, a hanger shot, or an existing on-model photo. We animate it into a 9:16 clip with believable drape and motion, and run a consistency gate so prints, stripes, logos, and seams hold their shape frame to frame. Approve the preview, get IG Reels / TikTok / 小紅書 files in 2–3 days — a full drop's worth of motion content without a single shoot day.",
    faqs: [
      {
        q: 'Will my print or logo stay intact when it moves?',
        a: 'Yes — pattern, logo, and seam consistency is precisely what our QC gate checks, since that\'s where generic AI apparel video falls apart.',
      },
      {
        q: 'Can you show the garment on a model, or just the product?',
        a: 'Both. We can animate an on-model clip from a lookbook photo, or bring a flatlay to life. Tell us the look and we steer the QC toward it.',
      },
      {
        q: 'Can you handle a whole seasonal drop at once?',
        a: 'Yes — send the drop as a batch. The 3-pack ($149) and 5-pack ($229) are built for exactly this, each piece with its own preview and revision.',
      },
    ],
    videoIds: [
      'sora-tokyo-walk',
      'ava-pendant-on-model',
      'runway-a-close-up-portrait-of-a-woman-lit-by-the-sid',
      'seedance-cyber-alley',
      'sora-lagos',
    ],
  },
  {
    slug: 'food-beverage',
    industry: 'Food & Beverage',
    h1: 'AI Product Videos for Food & Beverage Brands',
    subhead:
      'Turn a photo of your dish, drink, or packaged product into a mouth-watering 9:16 clip — the pour, the steam, the plating — without a food stylist or a reshoot.',
    metaDescription:
      'Done-for-you AI product videos for food and beverage brands. One photo → a QC-checked 9:16 Reel with pour, steam, and appetite appeal. 2–3 days, from $59.',
    painPoints: [
      {
        title: 'Appetite appeal lives in motion',
        body: 'The pour, the steam, the cheese pull, the plating reveal — that\'s what makes food sell, and a static photo captures the least appetizing frozen instant of it. Real food videography needs a stylist and fast shooting before the food dies on set.',
      },
      {
        title: 'Food spoils under the lights',
        body: 'Every take, the ice melts, the foam collapses, the sear goes cold. A small café or CPG brand can\'t re-plate a dish twenty times to get one clean pour on a phone camera.',
      },
      {
        title: 'AI generators mangle packaging and text',
        body: 'For a packaged product, generic AI video garbles your label and reshapes the can or jar — and for a plated dish, it invents ingredients that aren\'t on your menu.',
      },
    ],
    solution:
      "Send a photo of the dish, drink, or packaged product. We generate a 9:16 clip with the appetite-driving motion — a pour, steam, a plating reveal, a slow hero turn — and run a consistency gate so your packaging stays legible and the food matches what you actually serve. Approve the preview, get IG Reels / TikTok / 小紅書 files in 2–3 days. No stylist, no food waste, no melting ice.",
    faqs: [
      {
        q: 'Can you do a pour, steam, or cheese-pull shot?',
        a: 'Yes — that motion is the whole point for food, and it\'s what we prompt toward. Tell us the moment (a pour, a steam rise, a plating reveal) and we build the clip around it.',
      },
      {
        q: 'Will my product packaging and label stay accurate?',
        a: 'It will — label legibility and can/jar shape are checked by our consistency QC before delivery, so your packaged product on screen matches the shelf.',
      },
      {
        q: 'I run a small café / CPG brand. Is this practical for a menu?',
        a: 'Very — at $59 a clip and 2–3 day turnaround, you can give each signature dish or drink its own Reel from a single photo, no re-plating required.',
      },
    ],
    videoIds: [
      'kling-chef-plating',
      'pika-coffee-pour',
      'seedance-street-food',
      'sora-ships-in-coffee',
      'sora-monster-with-melting-candle',
    ],
  },
  {
    slug: 'pet-products',
    industry: 'Pet Products',
    h1: 'AI Product Videos for Pet Product Brands',
    subhead:
      'Turn a photo of your treat, toy, or accessory into a playful 9:16 clip that stops the scroll — without wrangling a dog on camera or waiting for the perfect take.',
    metaDescription:
      'Done-for-you AI product videos for pet product brands. One photo → a playful, QC-checked 9:16 Reel for Reels and TikTok in 2–3 days. From $59.',
    painPoints: [
      {
        title: 'Pets don\'t take direction',
        body: 'The content that sells pet products is playful motion, but animals ignore the script — you burn an afternoon for three usable seconds, and half the takes are a blurry tail leaving frame.',
      },
      {
        title: 'The product gets lost in the chaos',
        body: 'When you finally get the dog to engage, the actual product — the treat bag, the toy, the harness — is out of focus or off-screen. The clip is cute but sells nothing.',
      },
      {
        title: 'Generic AI can\'t keep the product consistent',
        body: 'Pet content is high-energy and fast, which is exactly where generic AI video drifts — the packaging morphs, the toy changes color, and the product you\'re selling loses its identity mid-clip.',
      },
    ],
    solution:
      "Send a clean photo of the product — the bag, the toy, the accessory. We build a playful, scroll-stopping 9:16 clip that keeps the product front and center, and run a consistency gate so the packaging and product hold their exact look through the motion. Approve the preview, get IG Reels / TikTok / 小紅書 files in 2–3 days. All the energy, none of the wrangling.",
    faqs: [
      {
        q: 'Can you include a pet, or just the product?',
        a: 'Both. We can build a product-hero clip, or bring in a playful animal moment — tell us the vibe and we steer the QC so your product still stays the star.',
      },
      {
        q: 'Will my treat bag / packaging stay recognizable?',
        a: 'Yes — packaging consistency through fast, energetic motion is exactly what our QC gate is for, so the product never morphs mid-clip.',
      },
      {
        q: 'I have several SKUs. Can you do a batch?',
        a: 'Yes — send them together. The 3-pack ($149) and 5-pack ($229) let you give every treat, toy, and accessory its own Reel with a preview and revision each.',
      },
    ],
    videoIds: [
      'pika-balloon-dog',
      'sora-dancing-kangaroo',
      'kling-galloping-horse',
      'runway-a-pink-pig-running-fast-toward-the-camera-in-',
      'sora-victoria-crowned-pigeon',
    ],
  },
  {
    slug: 'home-decor',
    industry: 'Home Decor',
    h1: 'AI Product Videos for Home Decor Brands',
    subhead:
      'Turn a photo of a piece into a warm, in-context 9:16 clip that shows how it lives in a room — without styling a set, renting a location, or booking a shoot.',
    metaDescription:
      'Done-for-you AI product videos for home decor brands. One photo → a QC-checked, in-context 9:16 Reel that sells the vibe in 2–3 days. From $59.',
    painPoints: [
      {
        title: 'Decor sells on context, not on white',
        body: 'A throw pillow, a lamp, a piece of wall art means nothing on a plain background — buyers need to see it in a styled room to feel it. But styling and shooting a room set is a location, a stylist, and a day you can\'t spare.',
      },
      {
        title: 'Light and material need to move',
        body: 'The way afternoon light falls on a linen, or a brass lamp glows, is what converts. A photo freezes one moment; the ambiance that sells the piece only comes alive in motion.',
      },
      {
        title: 'AI tools reshape the product',
        body: 'Generic AI video will happily restyle your lamp into a different lamp or change the pattern on your textile — useless when the exact product is what the customer is buying.',
      },
    ],
    solution:
      "Send a photo of the piece — on white or already in a room. We produce a warm, in-context 9:16 clip that shows the item living in a space, with light moving across it, and run a consistency gate so the product's shape, color, and pattern stay true. Approve the preview, get IG Reels / TikTok / 小紅書 files in 2–3 days. Room-set ambiance without renting a room.",
    faqs: [
      {
        q: 'Can you place my product in a styled room setting?',
        a: 'Yes — in-context, lived-in scenes are the most effective format for decor, and we can generate that setting around your product from a single photo.',
      },
      {
        q: 'Will the exact color and pattern of my piece be preserved?',
        a: 'Yes. Color, shape, and pattern fidelity are checked by our consistency QC, so the piece in the clip is the piece you ship.',
      },
      {
        q: 'Can I get a few pieces done for a collection launch?',
        a: 'Absolutely — batch them together. The 3-pack ($149) and 5-pack ($229) cover a collection, each item with its own preview and revision.',
      },
    ],
    videoIds: [
      'luma-crystal-bloom',
      'runway-an-empty-warehouse-where-flowers-start-bloomi',
      'hailuo-koi-pond',
      'ava-flatlay-to-motion',
      'luma-city-timelapse',
    ],
  },
  {
    slug: 'handmade-etsy',
    industry: 'Handmade & Etsy',
    h1: 'AI Product Videos for Handmade & Etsy Sellers',
    subhead:
      'Turn one photo of your handmade item into a scroll-stopping 9:16 clip for Reels and TikTok — the kind of motion content solo makers never have time to shoot.',
    metaDescription:
      'Done-for-you AI product videos for handmade and Etsy sellers. One photo → a QC-checked 9:16 Reel that shows off your craft in 2–3 days. From $59.',
    painPoints: [
      {
        title: 'You\'re the maker AND the marketer',
        body: 'As a solo Etsy seller you make the product, list it, pack it, and ship it. Learning to shoot and edit video on top of all that is the thing that never happens — so your listings stay photos while competitors post Reels.',
      },
      {
        title: 'One good photo is all you\'ve got',
        body: 'Most handmade sellers have exactly one decent product photo per item and no lighting kit for video. That single still has to do all the work, and static images don\'t travel on Reels or TikTok.',
      },
      {
        title: 'Generic AI erases the handmade feel',
        body: 'The tiny imperfections and hand-finished details are the whole reason people buy handmade — and generic AI video smooths them into a mass-produced look, undercutting your entire pitch.',
      },
    ],
    solution:
      "Send us the one photo you already have. We turn it into a scroll-stopping 9:16 clip that shows off the craft, and run a consistency gate so the handmade character and detail are preserved, not polished away. You approve a preview and get IG Reels / TikTok / 小紅書 files in 2–3 days — real motion content for your shop without buying a single piece of gear or learning an editor.",
    faqs: [
      {
        q: 'I only have one photo per item. Is that enough?',
        a: 'Yes — one clean photo is the whole input. More angles help, but a single good still is all we need to produce your clip.',
      },
      {
        q: 'Will it still look handmade, not mass-produced?',
        a: 'That\'s the point — our consistency QC preserves the hand-finished detail and character rather than smoothing it into a generic factory look.',
      },
      {
        q: 'I\'m not technical at all. What do I actually have to do?',
        a: 'Send a photo and a sentence about the vibe. We do the rest and send a preview to approve — no software, no editing, no learning curve.',
      },
    ],
    videoIds: [
      'ava-flatlay-to-motion',
      'ava-peach-pearl-set',
      'luma-crystal-bloom',
      'pika-balloon-dog',
      'runway-a-pencil-drawing-an-architectural-plan',
    ],
  },
  {
    slug: 'supplements-wellness',
    industry: 'Supplements & Wellness',
    h1: 'AI Product Videos for Supplements & Wellness Brands',
    subhead:
      'Turn a photo of your bottle, powder, or tincture into a clean, calming 9:16 clip that reads premium and trustworthy — without a studio or a reshoot.',
    metaDescription:
      'Done-for-you AI product videos for supplement and wellness brands. One photo → a clean, QC-checked 9:16 Reel that reads premium. 2–3 days, from $59.',
    painPoints: [
      {
        title: 'Trust is visual, and photos feel cheap',
        body: 'In supplements, a clip that looks premium and clinical builds the trust that closes the sale. A phone-shot photo on a kitchen counter reads amateur — and in wellness, amateur reads unsafe.',
      },
      {
        title: 'Bottle and label integrity is non-negotiable',
        body: 'Your label carries dosage, ingredients, and claims. Generic AI video that garbles text or reshapes the bottle isn\'t just ugly — for a supplement brand it\'s a compliance and trust problem you can\'t ship.',
      },
      {
        title: 'You need calm motion, not flashy chaos',
        body: 'Wellness sells through a calm, clean, grounded aesthetic — and most quick-and-dirty video (or hyperactive generic AI) does the opposite, undermining the exact feeling that converts.',
      },
    ],
    solution:
      "Send a photo of the bottle, powder, or tincture. We produce a clean, calm, premium-feeling 9:16 clip — a slow hero turn, soft light, a grounded natural mood — and run a consistency gate so the label stays fully legible and the bottle keeps its exact shape. Approve the preview, get IG Reels / TikTok / 小紅書 files in 2–3 days. Premium presentation without a production budget.",
    faqs: [
      {
        q: 'Will my label text and dosage info stay perfectly legible?',
        a: 'Yes — label integrity is the first thing our consistency QC verifies, because for supplements a garbled label is a non-starter. Your label reads exactly as it does on the bottle.',
      },
      {
        q: 'Can you match a clean, premium wellness aesthetic?',
        a: 'That calm, grounded, premium look is the default we steer toward for this category — soft light, slow motion, natural mood rather than flashy chaos.',
      },
      {
        q: 'Can you do my whole product line?',
        a: 'Yes — batch your SKUs together. The 3-pack ($149) and 5-pack ($229) cover a product line, each with a preview and one revision.',
      },
    ],
    videoIds: [
      'hailuo-koi-pond',
      'luma-crystal-bloom',
      'ava-flatlay-to-motion',
      'runway-an-oil-painting-of-a-natural-forest-environme',
      'sora-big-sur',
    ],
  },
];

const BY_SLUG = new Map(VERTICALS.map((v) => [v.slug, v]));

export function getVertical(slug: string): Vertical | undefined {
  return BY_SLUG.get(slug);
}
