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
    const qualities = [{ id: 1, name: '720p'}, { id: 2, name: '1080p'}, { id: 1, name: '4K'}]
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
    const qualities = ['720p', '1080p', '4K']
    try {
        res.render('admin/admin-default', {template: 'quality-list', qualities});
    }  catch (err) {
        console.log(err);
    }
});

router.get('/genre-list', async function (req, res) {
    const genres = await db.genre.findAll({})
    try {
        res.render('admin/admin-default', {template: 'genre-list', genres});
    }  catch (err) {
        console.log(err);
    }
});

router.get('/tag-list', async function (req, res) {
    const tags = await db.tag.findAll({})
    try {
        res.render('admin/admin-default', {template: 'tag-list', tags});
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
                            model: db.quality,
                            include: [
                                {
                                    model: db.link,
                                },
                            ]
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
        seasonsCount: 1,
        episodePerSeason: 1,
        image: 'a'

    },
    {
        name: 'Game of Thrones',
        workType: 'Series',
        actors: 'Emilia Clarke, Kit Harington, Sophie Turner',
        director: 'David Benioff, D.B. Weiss',
        hasDub: true,
        hasSub: true,
        hasSoftSub: false,
        seasonsCount: 5,
        score: 9.0,
        episodes: 73,
        duration: '60 min',
        year: 2011,
        episodePerSeason: 10,
        image: 'b'
    },
    {
        name: 'Friends',
        workType: 'Series',
        actors: 'Jennifer Aniston, Courteney Cox, Lisa Kudrow, Matt LeBlanc, Matthew Perry, David Schwimmer',
        director: 'David Crane, Marta Kauffman',
        hasDub: true,
        hasSub: true,
        hasSoftSub: false,
        seasonsCount: 3,
        score: 9.0,
        episodes: 236,
        duration: '22 min',
        year: 1994,
        episodePerSeason: 23,
        image: 'c'
    },
];

const mockQualities = ['720p', '1080p', '4K'];

router.get('/seed-v3', async function (req,res,next) {
    await db.sequelize.sync({ force: true });
    console.log('Cleared DB')
    try {

        for (let i = 0; i < mockWorks.length; i++) {
            const work = await db.work.create({
                name: mockWorks[i].name,
                workType: mockWorks[i].workType,
                actors: mockWorks[i].actors,
                director: mockWorks[i].director,
                hasDub: mockWorks[i].hasDub,
                hasSub: mockWorks[i].hasSub,
                hasSoftSub: mockWorks[i].hasSoftSub,
                duration: mockWorks[i].duration,
                year: mockWorks[i].year,
                image: mockWorks[i].image
            });
            for (let j = 0; j < mockWorks[i].seasonsCount; j++) {
                const season = await db.season.create({
                    name: 'Season ' + (j + 1),
                    workId: work.dataValues.id
                });

                for (let k = 0; k < mockQualities.length; k++) {
                    const quality = await db.quality.create({
                        name: mockQualities[k],
                        seasonId: season.dataValues.id
                    });

                    for (let l = 0; l < mockWorks[i].episodePerSeason; l++) {
                        await db.link.create({
                            name: mockWorks[i].name.replaceAll(' ', '') + mockQualities[k] + 'S' + (j + 1) + 'E' + (l + 1),
                            qualityId: quality.dataValues.id,
                            episode_no: l + 1,
                            url: 'https://s1.dlrozaneh/' + mockWorks[i].name.replaceAll(' ', '') + mockQualities[k] + 'S' + (j + 1) + 'E' + (l + 1) + '.mkv'
                        });
                    }
                }
            }
        }

        return res.send('Seeding completed successfully!')
    } catch (error) {
        console.error('Error seeding data:', error);
        return res.send(error)
    }

})

router.get('/seed-v2', async function (req,res,next) {
    await db.sequelize.sync({ force: true });
    console.log('Cleared DB')

    try {

        // Create quality records
        const quality1 = await db.quality.create({ name: '720p' });
        const quality2 = await db.quality.create({ name: '1080p' });

        // Create movie records
        const movie1 = await db.work.create({
            name: 'The Shawshank Redemption',
            workType: 'Movie',
            actors: 'Tim Robbins, Morgan Freeman',
            director: 'Frank Darabont',
            hasDub: true,
            hasSub: true,
            hasSoftSub: false,
            duration: '2h 22m',
            year: 1994,
        });

        const movie2 = await db.work.create({
            name: 'The Godfather',
            workType: 'Movie',
            actors: 'Marlon Brando, Al Pacino',
            director: 'Francis Ford Coppola',
            hasDub: true,
            hasSub: true,
            hasSoftSub: false,
            duration: '2h 55m',
            year: 1972,
        });

        // Create season records for movies (1 season, 1 episode)
        const movieSeason1 = await db.season.create({
            name: 'Season 1',
            workId: movie1.id,
            qualityId: quality1.id,
        });

        const movieSeason2 = await db.season.create({
            name: 'Season 1',
            workId: movie2.id,
            qualityId: quality2.id,
        });

        // Create link records for movie seasons
        await db.link.create({
            name: 'The Shawshank Redemption',
            episode_no: 1,
            url: 'https://example.com/shawshank-redemption',
            seasonId: movieSeason1.id,
        });

        await db.link.create({
            name: 'The Godfather',
            episode_no: 1,
            url: 'https://example.com/the-godfather',
            seasonId: movieSeason2.id,
        });

        // Create series records
        const series1 = await db.work.create({
            name: 'Game of Thrones',
            workType: 'Series',
            actors: 'Emilia Clarke, Kit Harington',
            director: 'David Benioff, D.B. Weiss',
            hasDub: true,
            hasSub: true,
            hasSoftSub: false,
            seasonsCount: 8,
            duration: '1h',
            year: 2011,
        });

        const series2 = await db.work.create({
            name: 'Breaking Bad',
            workType: 'Series',
            actors: 'Bryan Cranston, Aaron Paul',
            director: 'Vince Gilligan',
            hasDub: true,
            hasSub: true,
            hasSoftSub: false,
            seasonsCount: 5,
            duration: '49m',
            year: 2008,
        });

        // Create season records for series
        const seriesSeason1 = await db.season.create({
            name: 'Season 1',
            workId: series1.id,
            qualityId: quality1.id,
        });

        const seriesSeason2 = await db.season.create({
            name: 'Season 2',
            workId: series1.id,
            qualityId: quality1.id,
        });

        const seriesSeason3 = await db.season.create({
            name: 'Season 1',
            workId: series2.id,
            qualityId: quality2.id,
        });

        const seriesSeason4 = await db.season.create({
            name: 'Season 2',
            workId: series2.id,
            qualityId: quality2.id,
        });

        // Create link records for series seasons
        for (let i = 1; i <= 10; i++) {
            await db.link.create({
                name: `Episode ${i}`,
                episode_no: i,
                url: `https://example.com/game-of-thrones/season-1/episode-${i}`,
                seasonId: seriesSeason1.id,
            });
        }

        for (let i = 1; i <= 10; i++) {
            await db.link.create({
                name: `Episode ${i}`,
                episode_no: i,
                url: `https://example.com/game-of-thrones/season-2/episode-${i}`,
                seasonId: seriesSeason2.id,
            });
        }

        for (let i = 1; i <= 7; i++) {
            await db.link.create({
                name: `Episode ${i}`,
                episode_no: i,
                url: `https://example.com/breaking-bad/season-1/episode-${i}`,
                seasonId: seriesSeason3.id,
            });
        }

        for (let i = 1; i <= 13; i++) {
            await db.link.create({
                name: `Episode ${i}`,
                episode_no: i,
                url: `https://example.com/breaking-bad/season-2/episode-${i}`,
                seasonId: seriesSeason4.id,
            });
        }
        console.log('Seeding completed !')
        return res.send('Seeding completed successfully!')
    } catch (error) {
        console.error('Error seeding data:', error);
        return res.send(error)
    }
})
module.exports = router;
