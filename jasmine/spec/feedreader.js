/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /**
         * Tests that the urls for every item in allFeeds is defined and not empty.
         */
        it('should have all urls defined', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });


        /**
         * Tests that the names for every item in allFeeds is defined and not empty.
         */
        it('should have all names defined', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    /**
     * Suite that encompasses tests related to menu functionality.
     */
    describe('The menu', function () {
        var $body = $('body');

        /**
         * Tests if the menu is hidden on first load. It does this by checking if the CSS class
         * to hide the menu is on the body element.
         */
        it('should be hidden by default', function () {
            expect($body.hasClass('menu-hidden')).toBe(true);
        });

        /**
         * Tests if the menu will show when the menu icon is clicked and hide when clicked again.
         * It will call click on the menuIcon twice and check for the CSS class each time.
         */
        it('should open and close when icon is clicked', function () {
            var menuIcon = $('.menu-icon-link');
            menuIcon.click();
            expect($body.hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect($body.hasClass('menu-hidden')).toBe(true);
        });

    });

    // Only traverse DOM for the feed container once to use in multiple suites.
    var $feedContainer = $('.feed');

    /**
     * Suite that encompasses tests related to loading the initial feed.
     */
    describe('Initial Entries', function () {

        /**
         * Before each test, load the first feed, passing jasmine's done callback in order to run the test
         * afterwards.
         */
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        /**
         * Tests if the feed container elem has at least 1 element with class 'entry' after
         * the first feed is loaded.
         */
        it('should load', function (done) {
            expect($feedContainer.has('.entry').length).toBeGreaterThan(0);
            done();
        });

    });

    /**
     * Suite that encompasses tests related to when a new feed is selected.
     */
    describe('New Feed Selection', function () {
        var feedContent;

        /**
         * Before each test, grab the feed container content and store it. Then load the next feed,
         * passing the done callback.
         */
        beforeEach(function (done) {
            loadFeed(0, function() {
                feedContent = $feedContainer.html();
                loadFeed(1, done);
            });
        });

        /**
         * After each test, perform tear down by resetting the content to show the first feed.
         */
        afterEach(function () {
            loadFeed(0);
        });

        /**
         * Test that checks if the feed container's content is different than the previously saved content,
         * after the next feed is loaded.
         */
        it('should display new content', function (done) {
            expect($feedContainer.html()).not.toEqual(feedContent);
            done();
        });

    });
}());
