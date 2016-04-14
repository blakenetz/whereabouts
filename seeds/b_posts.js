
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('posts').del(),

    // Inserts seed entries
    knex('posts').insert({title: "Slain's Castle",
                          description: 'We started off in the town of Aberdeen and then trekking through some weird creepy forest on a super muddy path, up an old road, across a trench to this castle on the side of a  cliff. Super dilapidated but really cool and charming.',
                          rating: 530,
                          user_fk: 4,
                          lat: 57.4165,
                          lng: -1.8324,
                          img_link: 'http://i.gr-assets.com/images/S/photo.goodreads.com/hostedimages/1379783306i/443543.jpg'
                        }),
    knex('posts').insert({title: "Aberdeen Beach",
                          description: 'Wide open beach, lots of cool stuff washes up here. I found a shopping cart once!',
                          rating: 530,
                          user_fk: 4,
                          lat: 57.1539,
                          lng: -2.0782,
                          img_link: 'http://i.imgur.com/a8RLGqk.jpg'
                        }),
    knex('posts').insert({title: 'Paper Mill Ruins',
                          description: 'Located off Sope Creek, you would never know that this was here from the road. The mill was run by Marietta Paper Mills and was incorporated in 1859. Today the ruins still stand tall. A great place for a day hike',
                          rating: 560,
                          user_fk: 2,
                          lat: 33.9413,
                          lng: -84.4373,
                          img_link: 'https://flatfooting.files.wordpress.com/2015/05/img_3982.jpg'
                        }),
    knex('posts').insert({title: 'Deer Key',
                          description: 'Officially named Big Pine Key, this small island is known by the locals as Deer Key because of the presence of the rare key deer. Be careful when driving here, they are everywhere!',
                          rating: 200,
                          user_fk: 2,
                          lat: 24.6697,
                          lng: -81.3582,
                          img_link: 'https://s-media-cache-ak0.pinimg.com/736x/6c/cb/9a/6ccb9ab4c086bee2bb421f936aefe373.jpg'
                        }),
    knex('posts').insert({title: 'City Graffiti Wall',
                          description: 'Legal graffiti wall hidden in Scott Carpenter Park. The art here is always changing, and since it iss legal do not hesitate to try making your own! Been coming here since I was a kid.',
                          rating: 230,
                          user_fk: 6,
                          lat: 40.0137,
                          lng: -105.2542,
                          img_link: 'https://s3.amazonaws.com/gs-waymarking-images/80e31519-667d-4972-933a-18af6b5733af_d.jpg'
                        }),
    knex('posts').insert({title: "Ing'ley - The Waterfall that Steals Souls",
                          description: 'While backpacking through Senegal, we kept hearing rumors of a waterfall that the locals claimed would steal the souls of nyone who gazes upon its beauty. In order to get to this waterfall from where we were in Dindefelo, we had to bike. It was probably 30 miles of biking total off paths that were not marked on any map, but it was well worth the effort. If you are ever in Senegal, check it out.',
                          rating: 630,
                          user_fk: 3,
                          lat: 12.5140,
                          lng: -13.0648,
                          img_link: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Riviere_Langevin_Trou_Noir_P1440224-35.jpg'
                        }),
    knex('posts').insert({title: "Abandoned Mine on Turquoise Lake",
                          description: 'While the lake may be well known, the mine itself is hard to find. Hidden in the woods but really close to the lake. Check it out!',
                          rating: 330,
                          user_fk: 6,
                          lat: 39.2762,
                          lng: -106.3606,
                          img_link: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Mt._Elbert.jpg'
                        }),
    knex('posts').insert({title: "Old Cave in the Park",
                          description: 'Love this old cave in my hometown so much that me and my wife had our engagement photos taken here. Beautiful cave in a beautiful park!',
                          rating: 530,
                          user_fk: 5,
                          lat: 38.4585,
                          lng: -90.2936,
                          img_link: 'http://i.imgur.com/WQPhXVX.jpg'
                        }),
    knex('posts').insert({title: "Elk Meadow",
                          description: 'Elk Meadow Park is the most likely place in the Open Space system to view herds of elk. The meadow is prime grazing ground for the largest of Colorado’s native deer, as well as where mountain bluebirds flit and red-tailed hawks circle the sky hunting for rodents and other prey.',
                          rating: 490,
                          user_fk: 2,
                          lat: 39.6695,
                          lng: -105.3684,
                          img_link: 'http://1.bp.blogspot.com/-uuAxK6xJInc/TVQnNrb7_gI/AAAAAAAABvA/ZsqzUL3q4XY/s1600/Blog_74_ElkMeadowWinter__0002.jpg'
                        }),
    knex('posts').insert({title: "Oakland Cemetary",
                          description: 'Final resting place of famous Atlantans. A true jem in the heart of the city. Definitely worth a visit.',
                          rating: 490,
                          user_fk: 2,
                          lat: 33.7485,
                          lng: -84.3729,
                          img_link: 'https://c2.staticflickr.com/8/7109/14047386833_499aaf5b61_b.jpg'
                        })
  );
};
