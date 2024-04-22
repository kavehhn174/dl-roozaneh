const express = require("express");
const router = new express.Router();
const db = require('./../postgres/postgres');
const Quality = db.quality
router.get('/', async function (req, res) {
    try {
        res.render('admin/admin-default', {template: 'admin-dashboard'});
    }  catch (err) {
        console.log(err);
    }
});

router.get('/add-work', async function (req, res) {
    const qualities = await Quality.findAll({})
    try {
        res.render('admin/admin-default', {template: 'add-work', qualities});
    }  catch (err) {
        console.log(err);
    }
});

router.get('/work-list', async function (req, res) {
    try {
        res.render('pages/admin/add-work', {});
    }  catch (err) {
        console.log(err);
    }
});

router.get('/quality-list', async function (req, res) {
    const qualities = await Quality.findAll({})
    try {
        res.render('admin/admin-default', {template: 'quality-list', qualities});
    }  catch (err) {
        console.log(err);
    }
});

router.get('/edit-work', async function (req, res) {
    try {
        res.render('pages/admin/add-work', {});
    }  catch (err) {
        console.log(err);
    }
});

router.get('/works', async (req, res) => {
    try {
        const works = await db.work.findAll({
            include: [
                {
                    model: db.season,
                    include: [
                        {
                            model: db.link,
                        },
                        {
                            model: db.quality,
                        },
                    ],
                },
            ],
        });
        res.json(works);
    } catch (error) {
        console.error('Error fetching works:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Mock data
const mockWorks = [
    {
        name: 'The Shawshank Redemption',
        workType: 'Movie',
        actors: 'Tim Robbins, Morgan Freeman',
        director: 'Frank Darabont',
        hasDub: true,
        hasSub: true,
        score: 9.0,
        hasSoftSub: false,
        duration: '142 min',
        year: 1994,
    },
    {
        name: 'Game of Thrones',
        workType: 'Series',
        actors: 'Emilia Clarke, Kit Harington, Sophie Turner',
        director: 'David Benioff, D.B. Weiss',
        hasDub: true,
        hasSub: true,
        hasSoftSub: false,
        seasonsCount: 8,
        score: 9.0,
        episodes: 73,
        duration: '60 min',
        year: 2011,
    },
    {
        name: 'Breaking Bad',
        workType: 'Series',
        actors: 'Bryan Cranston, Aaron Paul, Anna Gunn',
        director: 'Vince Gilligan',
        hasDub: true,
        hasSub: true,
        hasSoftSub: false,
        seasonsCount: 5,
        score: 9.0,
        episodes: 62,
        duration: '49 min',
        year: 2008,
    },
    {
        name: 'Friends',
        workType: 'Series',
        actors: 'Jennifer Aniston, Courteney Cox, Lisa Kudrow, Matt LeBlanc, Matthew Perry, David Schwimmer',
        director: 'David Crane, Marta Kauffman',
        hasDub: true,
        hasSub: true,
        hasSoftSub: false,
        seasonsCount: 10,
        score: 9.0,
        episodes: 236,
        duration: '22 min',
        year: 1994,
    },
];

const mockQualities = ['720p', '1080p', '4K'];

const mockLinks = [
    {
        name: 'The Shawshank Redemption',
        episode_no: 1,
        url: 'https://example.com/shawshank-redemption',
        season_id: 1,
    },
    {
        name: 'Game of Thrones - Season 1 Episode 1',
        episode_no: 1,
        url: 'https://example.com/game-of-thrones/season1/episode1',
        season_id: 1,
    },
    {
        name: 'Breaking Bad - Season 1 Episode 1',
        episode_no: 1,
        url: 'https://example.com/breaking-bad/season1/episode1',
        season_id: 1,
    },
    {
        name: 'Breaking Bad - Season 2 Episode 1',
        episode_no: 1,
        url: 'https://example.com/breaking-bad/season2/episode1',
        season_id: 2,
    },
    {
        name: 'Breaking Bad - Season 3 Episode 1',
        episode_no: 1,
        url: 'https://example.com/breaking-bad/season3/episode1',
        season_id: 3,
    },
    {
        name: 'Friends - Season 1 Episode 1',
        episode_no: 1,
        url: 'https://example.com/friends/season1/episode1',
        season_id: 1,
    },
    {
        name: 'Friends - Season 2 Episode 1',
        episode_no: 1,
        url: 'https://example.com/friends/season2/episode1',
        season_id: 2,
    },
    {
        name: 'Friends - Season 3 Episode 1',
        episode_no: 1,
        url: 'https://example.com/friends/season3/episode1',
        season_id: 3,
    },
    // Add more mock links as needed
];
router.get('/seed', async function (req,res) {
    try {
        await db.sequelize.sync({ force: true });

        // Insert mock qualities
        const qualities = await db.quality.bulkCreate(
            mockQualities.map((name) => ({ name }))
        );

        // Insert mock works
        const works = await db.work.bulkCreate(mockWorks);

        // Insert mock seasons and links
        for (const work of works) {
            const seasons = [];
            for (let i = 1; i <= (work.workType === 'Movie' ? 1 : work.seasonsCount); i++) {
                const season = await db.season.create({
                    name: work.workType === 'Movie' ? 'Season 1' : `Season ${i}`,
                    work_id: work.id,
                    quality_id: qualities[0].id,
                });
                seasons.push(season);

                // Insert mock links for this season
                const links = mockLinks.filter(
                    (link) => link.name.includes(work.name) && link.season_id === season.id
                );
                await db.link.bulkCreate(links);
            }
        }

        console.log('Data seeded successfully!');
    } catch (error) {
        console.error('Error seeding data:', error);
    }

})
module.exports = router;
