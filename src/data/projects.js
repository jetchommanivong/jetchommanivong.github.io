/* ── Case study data ──────────────────────────────────────────────────────────

   Each project has a list of `sections`. Each section is a chapter of the case
   study (it also becomes an entry in the sticky side nav). Each section holds
   `blocks`, rendered top to bottom.

   Block types:

     { type: 'summary',  items: [{ label, text }] }        3-up challenge / role / outcome
     { type: 'prose',    text: 'para' | ['para', 'para'] } body copy
     { type: 'figure',   src, alt, caption, wide }         one image + caption
     { type: 'gallery',  columns: 2 | 3, items: [{ src, alt, caption }] }
     { type: 'steps',    items: [{ phase, detail, src, alt, caption }] }
     { type: 'stats',    items: [{ value, label }] }
     { type: 'themes',   items: [{ label, finding }] }
     { type: 'quotes',   items: ['quote'] | [{ text, attribution }] }
     { type: 'callout',  title, text }
     { type: 'slot',     title, hint, tall }               ← evidence placeholder

   `slot` blocks are the empty spaces for evidence you have not added yet.
   They ONLY render during `npm run dev` — the deployed site never shows them.
   To fill one, swap the block for a `figure` or `gallery` and drop the image
   into /public/projects/.

   Every image needs `alt` (what it shows, for screen readers) and `caption`
   (what it proves, for the reader).
   ──────────────────────────────────────────────────────────────────────────── */

export const PROJECTS = [
  /* ═══ PixelPolish ═══════════════════════════════════════════════════════ */
  {
    id: 'pixelpolish',
    name: 'PixelPolish',
    year: '2025',
    role: 'UX Designer & Developer',
    tagline: 'Booking website for a boutique nail studio',
    description:
      'End-to-end design and build of a booking system for a sole-operator nail studio. ' +
      'Validated with a 15-person usability study and iterated based on findings.',
    tools: ['Figma', 'React', 'Firebase', 'Vite'],
    highlights: ['15-person usability study', '4.9 / 5 satisfaction', 'Live client site'],
    outcome: 'Live at pixelpolish.com.au',
    url: 'https://pixelpolish.com.au',
    color: '#FF6B35',
    cover: '/projects/pixelpolish-home.png',
    coverAlt: 'PixelPolish home page showing the studio branding and a book now call to action',
    meta: [
      { label: 'Role', value: 'UX Designer & Developer' },
      { label: 'Team', value: 'Solo, with the studio owner' },
      { label: 'Type', value: 'Client project — shipped' },
      { label: 'Focus', value: 'Booking flow, pricing clarity, admin tooling' },
    ],

    sections: [
      {
        id: 'overview',
        label: 'Overview',
        title: 'A booking system a sole operator can run herself',
        blocks: [
          {
            type: 'summary',
            items: [
              {
                label: 'Challenge',
                text: 'Tier-based pricing and automatic time blocking are complex to model — and that complexity had to stay invisible to clients.',
              },
              {
                label: 'My role',
                text: 'Research, interaction design, visual design, and the full React + Firebase build. Solo.',
              },
              {
                label: 'Outcome',
                text: 'Shipped and live. 15 / 15 test participants completed a booking unaided and rated ease of use 5 / 5.',
              },
            ],
          },
          {
            type: 'figure',
            src: '/projects/pixelpolish-home.png',
            alt: 'PixelPolish home page with studio branding, service preview, and a primary book now button',
            caption: 'The home page. One primary action — everything else is secondary to getting a client into the booking flow.',
            wide: true,
          },
        ],
      },

      {
        id: 'context',
        label: 'The brief',
        title: 'What the studio actually needed',
        blocks: [
          {
            type: 'prose',
            text:
              'A sole-operator nail studio needed a complete booking system she could manage herself, ' +
              'with tier-based pricing, automatic time blocking, and an admin view for appointments ' +
              'and availability. The challenge was making that complexity invisible to clients while ' +
              'giving the owner full control, without requiring manual quoting for every booking.',
          },
          {
            type: 'callout',
            title: 'The constraint that shaped everything',
            text:
              'Every booking previously required a back-and-forth DM to quote a price and confirm a time. ' +
              'If the site could not price a booking on its own, it would not remove any work from her day.',
          },
          {
            type: 'slot',
            title: 'Evidence: the original workflow',
            hint:
              'A screenshot of the DM quoting back-and-forth, her old pricing note, or the paper diary she ' +
              'used to block time. Anything that shows the "before" makes the problem concrete.',
          },
        ],
      },

      {
        id: 'process',
        label: 'Process',
        title: 'From her workflow to a shipped product',
        blocks: [
          {
            type: 'steps',
            items: [
              {
                phase: 'Design',
                detail:
                  "Mapped the operator's workflow first: how she prices, blocks time, and handles " +
                  'cancellations. Then translated that into a client-facing Figma prototype focused ' +
                  'on low-friction booking that handled edge cases automatically.',
                src: '/projects/pixelpolish-design-prices.png',
                alt: 'Figma design of the pricing page showing service tiers laid out as cards',
                caption: 'Pricing in Figma. Tiers had to read as a simple menu, not as a rules engine.',
              },
              {
                phase: 'Build',
                detail:
                  'Built with React and Vite. Originally used Supabase for the backend, but ' +
                  'PostgREST became unstable under real load. Migrated to Firebase Firestore, ' +
                  'which resolved the reliability issues.',
              },
              {
                phase: 'Usability study',
                detail:
                  'Ran a structured 15-person survey post-launch. Participants completed the booking ' +
                  'flow on the live site and answered questions on comprehension, navigation clarity, ' +
                  'pricing understanding, and overall experience.',
              },
              {
                phase: 'Iteration',
                detail:
                  "Research consistently flagged one gap: clients couldn't visualise what each " +
                  'pricing tier looked like. Built a per-tier gallery system so the owner can ' +
                  'upload reference images against each service level.',
                src: '/projects/pixelpolish-gallery.png',
                alt: 'Gallery page showing example nail sets grouped under each pricing tier',
                caption: 'The gallery shipped in response to research — each tier now has visual reference.',
              },
            ],
          },
          {
            type: 'gallery',
            columns: 2,
            items: [
              {
                src: '/projects/pixelpolish-booking.png',
                alt: 'Booking screen where a client selects a service and add-ons',
                caption: 'Step one: service selection. Price updates live as choices are made.',
              },
              {
                src: '/projects/pixelpolish-booking-timeslot.png',
                alt: 'Time slot picker showing available appointment times for a selected date',
                caption: 'Step two: only genuinely available slots appear — duration is derived from the service.',
              },
            ],
          },
          {
            type: 'slot',
            title: 'Evidence: Figma → shipped',
            hint:
              'A side-by-side of the Figma prototype and the live screen. Showing what changed between ' +
              'design and build — and why — is the single strongest thing you can add here.',
            tall: true,
          },
        ],
      },

      {
        id: 'research',
        label: 'Research',
        title: 'What 15 people told me',
        blocks: [
          {
            type: 'prose',
            text:
              'Participants completed a real booking on the live site, then answered questions on ' +
              'comprehension, navigation, pricing understanding, and overall experience.',
          },
          {
            type: 'stats',
            items: [
              { value: '100%', label: 'Immediate comprehension' },
              { value: '4.9 / 5', label: 'Overall satisfaction' },
              { value: '15', label: 'Participants tested' },
              { value: '100%', label: 'Navigation rated clear' },
            ],
          },
          {
            type: 'slot',
            title: 'Evidence: survey results',
            hint:
              'Export the response charts from Google Forms, or screenshot the raw results sheet. ' +
              'Numbers in a stat tile are a claim; the chart behind them is proof.',
            tall: true,
          },
          {
            type: 'themes',
            items: [
              {
                label: 'Visual design',
                finding:
                  'Described as modern, professional, and fun/playful across all responses. ' +
                  'Multiple participants noted it was cleaner and easier than other nail booking ' +
                  "sites they'd used.",
              },
              {
                label: 'Booking flow',
                finding:
                  'All 15 participants completed the booking and rated ease of use 5 / 5. ' +
                  'Zero reported feeling lost or unsure where to go next.',
              },
              {
                label: 'Pricing clarity',
                finding:
                  '12 of 15 fully understood how their total would be calculated. The 3 who ' +
                  'were uncertain all pointed to the same gap: no visual reference for what ' +
                  'each tier looks like in practice.',
              },
              {
                label: 'Top requested additions',
                finding:
                  'More nail photos (10 / 15), customer reviews (8 / 15), FAQ and aftercare ' +
                  'information (5 / 15), a pre-booking message option (5 / 15).',
              },
            ],
          },
          {
            type: 'quotes',
            items: [
              "Better than a lot of other nail sites I've used in the past. Very easy to use and it's very clear on what you are booking.",
              'Super cute and really easy to understand. I cannot see anyone getting confused by this.',
              'So cute, so easy, love it!!',
            ],
          },
        ],
      },

      {
        id: 'outcome',
        label: 'Outcome',
        title: 'Shipped, and running without me',
        blocks: [
          {
            type: 'prose',
            text: [
              'The site is live at pixelpolish.com.au and the owner runs it herself. Bookings are priced, ' +
                'timed, and blocked automatically — the quoting conversation that used to precede every ' +
                'appointment is gone.',
              'The admin view lets her manage appointments and availability, and upload reference images ' +
                'against each pricing tier without touching the code.',
            ],
          },
          {
            type: 'figure',
            src: '/projects/pixel-polish-admin.png',
            alt: 'Admin dashboard listing upcoming appointments and availability controls',
            caption: 'The admin view. Built for one person managing her own diary between clients.',
            wide: true,
          },
          {
            type: 'slot',
            title: 'Evidence: impact',
            hint:
              'Bookings taken since launch, hours saved per week, or a message from the owner about what ' +
              'changed for her. One real number or one real quote turns this from a build into a result.',
          },
        ],
      },

      {
        id: 'screens',
        label: 'Screens',
        title: 'The rest of the product',
        blocks: [
          {
            type: 'gallery',
            columns: 3,
            items: [
              {
                src: '/projects/pixelpolish-prices.png',
                alt: 'Public pricing page listing each service tier and its cost',
                caption: 'Pricing, shown up front rather than on request.',
              },
              {
                src: '/projects/pixelpolish-book.png',
                alt: 'Booking confirmation screen summarising the selected service, time, and total',
                caption: 'Confirmation — the full booking restated before commitment.',
              },
              {
                src: '/projects/pixelpolish-policies.png',
                alt: 'Policies page covering cancellations, deposits, and aftercare',
                caption: 'Policies, surfaced in the flow instead of buried in a bio link.',
              },
            ],
          },
        ],
      },
    ],
  },

  /* ═══ Evitas ════════════════════════════════════════════════════════════ */
  {
    id: 'eva',
    name: 'Evitas',
    year: '2025',
    role: 'UX / UI Designer & Developer',
    tagline: 'Brand & website for a Developmental Education practice',
    description:
      'Brand identity and website for a Developmental Education practitioner. ' +
      'Translated a deeply personal brief, centred on a dandelion motif, into a ' +
      'warm, inclusive identity and a fully deployed site.',
    tools: ['Figma', 'Adobe Illustrator', 'React', 'Vite', 'React Router'],
    highlights: ['Logo built from scratch', 'Full brand system', 'Live client site'],
    outcome: 'Delivered to client · live at evitasde.com',
    url: 'https://www.evitasde.com',
    color: '#A855F7',
    cover: '/projects/evitas-home.png',
    coverAlt: 'Evitas home page with the dandelion handprint logo and a green brand palette',
    meta: [
      { label: 'Role', value: 'UX / UI Designer & Developer' },
      { label: 'Team', value: 'Solo, with the client' },
      { label: 'Type', value: 'Client project — shipped' },
      { label: 'Focus', value: 'Brand identity, inclusive language, web build' },
    ],

    sections: [
      {
        id: 'overview',
        label: 'Overview',
        title: 'A brand built around one image the client already had in her head',
        blocks: [
          {
            type: 'summary',
            items: [
              {
                label: 'Challenge',
                text: 'The brief was about feeling, not function. Visitors had to feel something before they read anything.',
              },
              {
                label: 'My role',
                text: 'Logo design in Illustrator, the full visual system in Figma, copywriting, and the React build.',
              },
              {
                label: 'Outcome',
                text: 'Delivered and live at evitasde.com, with an enquiry form ready for her future clinic.',
              },
            ],
          },
          {
            type: 'figure',
            src: '/projects/evitas-home.png',
            alt: 'Evitas home page hero featuring the dandelion handprint mark over a green palette',
            caption: 'The dandelion leads. The mark is the first thing you meet, before any copy.',
            wide: true,
          },
        ],
      },

      {
        id: 'context',
        label: 'The brief',
        title: 'A dandelion made of handprints',
        blocks: [
          {
            type: 'prose',
            text:
              'Eva is a Developmental Education practitioner building toward her own future ' +
              'clinic. Her brief was centred on feeling rather than function. She wanted ' +
              'visitors to feel something before they read anything. The dandelion was personal: ' +
              "she has a vision for a feature wall where clients' handprints form the seeds, " +
              'representing growth, individuality, connection, and hope. The site needed to ' +
              'carry those same values while positioning her practice for people of all ages ' +
              'and all abilities.',
          },
          {
            type: 'quotes',
            items: [
              'I would love the website to reflect these values and feel warm, inclusive, professional, and family-friendly.',
              "One idea that is very special to me is to have a large feature wall in my future clinic with a dandelion created from my clients' handprints. To me, it represents growth, individuality, connection, hope, and the unique journey of every person and family I support.",
            ],
          },
          {
            type: 'slot',
            title: 'Evidence: the original brief',
            hint:
              "A slide from Eva's university deck, her mood board, or the first message where she described " +
              'the handprint wall. Showing the raw input makes the translation to brand visible.',
          },
        ],
      },

      {
        id: 'identity',
        label: 'Identity',
        title: 'Building the mark',
        blocks: [
          {
            type: 'prose',
            text:
              'The dandelion handprint logo was created from scratch in Adobe Illustrator, based on ' +
              "Eva's university slides and her vision for the clinic feature wall. Every subsequent " +
              'visual decision — section backgrounds, values cards, decorative elements — referenced ' +
              "that mark. It wasn't decorative: it carried the values Eva built her practice around.",
          },
          {
            type: 'slot',
            title: 'Evidence: logo construction',
            hint:
              'Your Illustrator artboard, early sketches, or rejected directions. Three versions side by ' +
              'side with a line on why the final one won is worth more than the final logo alone.',
            tall: true,
          },
          {
            type: 'figure',
            src: '/projects/evitas-values.png',
            alt: 'Values section with six cards, each in a distinct colour — coral, sky, sage, lavender, gold, and blush',
            caption:
              'One colour per value: coral, sky, sage, lavender, gold, blush. The palette does the emotional work the brief asked for.',
            wide: true,
          },
          {
            type: 'slot',
            title: 'Evidence: the palette & type scale',
            hint:
              'Export the colour and typography frames from your Figma file. A visible design system reads ' +
              'as rigour — and it is the artefact hiring managers look for.',
          },
        ],
      },

      {
        id: 'decisions',
        label: 'Decisions',
        title: 'Design decisions',
        blocks: [
          {
            type: 'themes',
            items: [
              {
                label: 'Dandelion as brand anchor',
                finding:
                  'The handprint dandelion logo was created from scratch in Adobe Illustrator, ' +
                  "based on Eva's university slides and her vision for the clinic feature wall. " +
                  'Every subsequent visual decision, including section backgrounds, values cards, ' +
                  "and decorative elements, referenced that mark. It wasn't decorative: it carried " +
                  'the values Eva built her practice around.',
              },
              {
                label: 'Colour & tone',
                finding:
                  'Started with soft, subtle pastels per the brief. Feedback pushed toward ' +
                  'more vibrant greens, which became the primary brand colour, ranging from ' +
                  'sage through deep green, grounding the warmth without losing the calm feel.',
              },
              {
                label: 'Language & positioning',
                finding:
                  "'Play-based' was removed at Eva's request. All copy was rewritten to " +
                  'emphasise full lifespan practice, using inclusive language that speaks to ' +
                  'families, adults, and everyone in between.',
              },
              {
                label: 'Contact & enquiry',
                finding:
                  'An enquiry form was a key requirement as Eva moves toward establishing ' +
                  'her clinic. Integrated and deployed so people can reach her directly ' +
                  'from the site.',
              },
            ],
          },
          {
            type: 'callout',
            title: 'The language change that mattered most',
            text:
              "Dropping 'play-based' repositioned the practice from children's services to full lifespan " +
              "care. 'People of all ages and all abilities' became the consistent line across every page.",
          },
          {
            type: 'slot',
            title: 'Evidence: before / after copy',
            hint:
              'The original wording next to the rewritten wording. Copy changes are invisible in a ' +
              'screenshot — spelling them out shows the thinking.',
          },
        ],
      },

      {
        id: 'process',
        label: 'Process',
        title: 'Brief to deploy',
        blocks: [
          {
            type: 'steps',
            items: [
              {
                phase: 'Brief & discovery',
                detail:
                  'Eva came with slides from a university assignment and a clear emotional ' +
                  'vision. Early conversations uncovered the deeper meaning behind the dandelion, ' +
                  'the planned handprint wall, which became the emotional anchor for every ' +
                  'design decision that followed.',
              },
              {
                phase: 'Design',
                detail:
                  'Created the dandelion handprint logo from scratch in Adobe Illustrator, ' +
                  "drawing directly from Eva's university slides and her vision of the handprint " +
                  'wall. The mark became the foundation for the entire visual system, built out ' +
                  "in Figma. Language was crafted deliberately: 'play-based' was removed and " +
                  "copy rewritten to emphasise lifespan practice, with 'people of all ages and " +
                  "all abilities' as the consistent message across every page.",
              },
              {
                phase: 'Iteration',
                detail:
                  "Eva's feedback pushed the palette toward more vibrant greens, and the " +
                  'dandelion was scaled up to take a more prominent role in the hero. The ' +
                  'values section grew a distinct colour per value: coral, sky, sage, lavender, ' +
                  "gold, and blush, each tied to the brand's emotional core.",
                src: '/projects/evitas-home2.png',
                alt: 'Second home page view after iteration, with a larger dandelion and more vibrant greens',
                caption: 'After feedback: greens deepened, dandelion scaled up to carry the hero.',
              },
              {
                phase: 'Build & deploy',
                detail:
                  'Built in React with Vite and React Router, deployed to evitasde.com on ' +
                  'Vercel. A contact and enquiry form was integrated so future clients can ' +
                  'reach Eva directly from the site.',
                src: '/projects/evitas-contact.png',
                alt: 'Contact page with an enquiry form for prospective clients',
                caption: 'The enquiry form — the one feature Eva named as essential for her clinic.',
              },
            ],
          },
        ],
      },

      {
        id: 'screens',
        label: 'Screens',
        title: 'Across the site',
        blocks: [
          {
            type: 'gallery',
            columns: 2,
            items: [
              {
                src: '/projects/evitas-about.png',
                alt: 'About page introducing Eva and her approach to Developmental Education',
                caption: 'About — written to speak to families, adults, and everyone in between.',
              },
              {
                src: '/projects/evitas-qualifications.png',
                alt: 'Qualifications section listing credentials and professional memberships',
                caption: 'Qualifications, given their own space to establish credibility early.',
              },
              {
                src: '/projects/evitas-services.png',
                alt: 'Services page listing the supports Eva offers',
                caption: 'Services, framed by life stage rather than by age bracket.',
              },
              {
                src: '/projects/evitas-services-button.png',
                alt: 'Expanded service card revealing detail after the button is pressed',
                caption: 'Detail is progressive — the page stays scannable until you ask for more.',
              },
              {
                src: '/projects/evitas-calltoaction.png',
                alt: 'Closing call to action inviting visitors to get in touch',
                caption: 'Closing call to action, carrying the dandelion through to the last screen.',
              },
            ],
          },
        ],
      },
    ],
  },

  /* ═══ Fridgit ═══════════════════════════════════════════════════════════ */
  {
    id: 'fridgit',
    name: 'Fridgit',
    year: '2025',
    role: 'UX Researcher & Developer',
    tagline: 'Shared fridge inventory tracker, voice-first, built for shared homes',
    description:
      'A team of six designed and built Fridgit for DECO2850 at UQ. I ran contextual ' +
      'inquiry sessions, designed the visual inventory system (pie chart display and expiry ' +
      'screensaver), and built the voice recognition pipeline, migrating from the Web ' +
      'Speech API to OpenAI Whisper with custom prompt engineering for natural language.',
    tools: [
      'React Native',
      'Expo',
      'OpenAI Whisper',
      'GPT-4o-mini',
      'Google Cloud Vision',
      'Node.js',
      'Figma',
    ],
    highlights: ['11 participants', '3 prototype iterations', '6-person team'],
    outcome: 'University project · DECO2850 Studio 2, UQ',
    color: '#3b82f6',
    cover: '/projects/inventory.png',
    coverAlt: 'Fridgit inventory screen showing fridge contents as a categorised pie chart',
    meta: [
      { label: 'Role', value: 'UX Researcher & Developer' },
      { label: 'Team', value: '6-person studio team' },
      { label: 'Type', value: 'University project — DECO2850, UQ' },
      { label: 'Focus', value: 'Voice interaction, ambient information display' },
    ],

    sections: [
      {
        id: 'overview',
        label: 'Overview',
        title: 'Why open the fridge at all?',
        blocks: [
          {
            type: 'summary',
            items: [
              {
                label: 'Challenge',
                text: 'Tracking apps die from logging fatigue. Any system that asked housemates to type what they bought would be abandoned.',
              },
              {
                label: 'My role',
                text: 'Contextual inquiry, the voice pipeline (with one teammate), the inventory and expiry display design, and the final evaluation.',
              },
              {
                label: 'Outcome',
                text: 'Three prototype iterations, 11 participants, and six UX finding themes carried into the final build.',
              },
            ],
          },
          {
            type: 'figure',
            src: '/projects/inventory.png',
            alt: 'Inventory screen displaying fridge contents as a pie chart segmented by food category',
            caption:
              'The inventory as a pie chart. Chart shape doubles as a nutrition signal — heavy dairy, light vegetables reads instantly.',
            wide: true,
          },
        ],
      },

      {
        id: 'context',
        label: 'Context',
        title: '$2,500 of food a year, and nobody knows whose it is',
        blocks: [
          {
            type: 'prose',
            text:
              'Australian households waste an average of $2,500 worth of food per year, worse in ' +
              'shared homes where food ownership blurs and coordination breaks down. Fridgit is a ' +
              'shared fridge inventory tracker designed to live as a mounted screen near the fridge: ' +
              'one glance replaces opening shelves, searching, and discovering something expired. ' +
              'Voice logging and receipt scanning eliminate manual entry. Built by a six-person ' +
              'team for DECO2850 Studio 2 Interaction Design at UQ, Fridgit moved through three ' +
              'prototype iterations, from cardboard role-play to a working React Native app.',
          },
          {
            type: 'slot',
            title: 'Evidence: the three prototypes',
            hint:
              'Photos of the cardboard prototype, the mid-fidelity version, and the React Native build, ' +
              'in sequence. A visible iteration trail is the strongest artefact a studio project produces.',
            tall: true,
          },
        ],
      },

      {
        id: 'research',
        label: 'Research',
        title: 'Contextual inquiry & evaluation',
        blocks: [
          {
            type: 'steps',
            items: [
              {
                phase: 'Contextual inquiry',
                detail:
                  "Ran two 'make us a sandwich' sessions. Participants were given the task and " +
                  'observed moving through a real kitchen. The exercise surfaced how people ' +
                  'actually store and search for food, and how often they discover something ' +
                  "expired in the process. These sessions fed the team's early research synthesis.",
              },
              {
                phase: 'User testing',
                detail:
                  'Designed and ran the final evaluation: Likert-scale questionnaires paired ' +
                  'with think-aloud sessions focused on the voice interaction. Synthesised ' +
                  'results into six UX finding themes covering recording feedback, flow friction, ' +
                  'speech accuracy, trust in shared systems, and motivation.',
              },
            ],
          },
          {
            type: 'stats',
            items: [
              { value: '11', label: 'Participants interviewed' },
              { value: '3', label: 'Prototype iterations' },
              { value: '3.75 / 5', label: 'Voice command learnability' },
              { value: '6', label: 'UX finding themes' },
            ],
          },
          {
            type: 'slot',
            title: 'Evidence: research artefacts',
            hint:
              'Affinity diagram, the Likert results chart, or a photo from a contextual inquiry session. ' +
              'For a research-led role this is the section that gets you the interview — fill it first.',
            tall: true,
          },
          {
            type: 'quotes',
            items: [
              'Surprised that the voice recognition picked up very well.',
              'Flow is not great, could be better.',
              'It would be tedious to log each and every thing per gram.',
              "If we could change one thing… we should share stuff so it doesn't expire and go to waste.",
            ],
          },
        ],
      },

      {
        id: 'insights',
        label: 'Insights',
        title: 'Research & design insights',
        blocks: [
          {
            type: 'themes',
            items: [
              {
                label: 'App abandonment & motivation',
                finding:
                  'During prototyping, I interviewed users about why they stop using tracking ' +
                  'apps like MyFitnessPal. The consistent answer: manually logging everything ' +
                  'is too tedious to sustain. This directly drove adding voice logging in ' +
                  'Prototype 2, shifting the focus from making logging accurate to making it ' +
                  "something people don't have to think about.",
              },
              {
                label: 'Limiting fridge interactions',
                finding:
                  'Opening a fridge to check what’s inside requires multiple interactions: open, ' +
                  'scan each shelf, locate the item, close. A mounted screen with a live ' +
                  'inventory collapses that to one. This insight shaped the whole display ' +
                  'paradigm. Fridgit is as much a passive information radiator as an active tracker.',
              },
              {
                label: 'Pie chart inventory display',
                finding:
                  'Showing contents as a categorised pie chart makes items scannable at a ' +
                  'glance and signals nutritional balance passively. A fridge heavy in dairy ' +
                  'and light in vegetables reads from the chart shape immediately, with no ' +
                  'scrolling or searching required. The category breakdown also reinforces the ' +
                  "app's role as a prompt toward less waste and healthier eating.",
              },
              {
                label: 'Expiry screensaver',
                finding:
                  'The homescreen acts as a screensaver always showing which items are ' +
                  'expiring soon, traffic-light coded: red (use now), yellow (use soon), ' +
                  'green (fine). The most time-sensitive food information surfaces passively, ' +
                  'without requiring users to open the app and go looking for it.',
              },
              {
                label: 'Speech pattern research',
                finding:
                  'Background research showed that people speaking to a system naturally ' +
                  'simplify their speech: shorter sentences, slower pace, fewer idioms. ' +
                  'The Whisper prompt was engineered to handle both natural speech ' +
                  "('a couple of tomatoes') and this simplified register, estimating " +
                  'quantities where needed. Multi-language support was added deliberately ' +
                  "for shared households where English isn't the primary language.",
              },
              {
                label: 'Voice UX & recording feedback',
                finding:
                  "Users couldn't tell when the system was listening. Recording confirmation " +
                  'scored 2.0 / 5 in the final Likert evaluation. The voice interface was ' +
                  'redesigned with minimal required presses and explicit visual recording ' +
                  'state, so users always knew when the system was active. Clear feedback ' +
                  'was treated as an ethical requirement, not just a UX one.',
              },
            ],
          },
        ],
      },

      {
        id: 'design',
        label: 'Design',
        title: 'What I designed and built',
        blocks: [
          {
            type: 'steps',
            items: [
              {
                phase: 'Voice pipeline (with one teammate)',
                detail:
                  'Started with the Google Web Speech API, easy to integrate and parsing directly ' +
                  'to text. The problem: Chrome-only, ruling it out for a native app. Switched to ' +
                  'OpenAI Whisper, which runs cross-platform, supports multiple languages, and ' +
                  'accepts custom prompts. Prompt engineering handled natural speech patterns: ' +
                  "'a couple of tomatoes' gets estimated and categorised rather than rejected. " +
                  'Background research on speech-to-system behaviour informed this. People ' +
                  'naturally simplify how they speak to machines, and the pipeline was tuned to ' +
                  'meet them there.',
              },
              {
                phase: 'Visual system design',
                detail:
                  'Designed the inventory display around one question: why open the fridge at all? ' +
                  'A mounted screen showing a pie chart of everything inside, categorised by food ' +
                  'type with quantity, replaces searching shelves with a single glance. The same ' +
                  'logic drove the expiry screensaver: the homescreen passively shows what’s ' +
                  'expiring soon, colour-coded red/yellow/green, so the most urgent food ' +
                  'information is always visible without the user going looking for it. The ' +
                  'category breakdown also doubles as a passive nutritional signal. A fridge ' +
                  'heavy in dairy and light in vegetables reads at a glance from the chart shape.',
              },
            ],
          },
          {
            type: 'slot',
            title: 'Evidence: the voice interaction',
            hint:
              'A GIF or frame sequence of the recording state — the thing that scored 2.0 / 5 and then ' +
              'got redesigned. Before and after, side by side, tells that story in one image.',
            tall: true,
          },
          {
            type: 'gallery',
            columns: 2,
            items: [
              {
                src: '/projects/expiryitems.png',
                alt: 'Expiry screen listing items colour-coded red, yellow, and green by urgency',
                caption:
                  'The expiry screensaver. Traffic-light coding means urgency is read, not calculated.',
              },
              {
                src: '/projects/household.png',
                alt: 'Household screen showing shared members of the fridge and their items',
                caption:
                  'Household view. Shared ownership was the trust problem the research kept surfacing.',
              },
            ],
          },
        ],
      },
    ],
  },
]

export default PROJECTS
