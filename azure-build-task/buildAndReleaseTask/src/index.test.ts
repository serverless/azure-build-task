
import * as ttm from 'azure-pipelines-task-lib/mock-test';
import * as path from 'path';


describe('Sample task tests', function () {

    it('should succeed with simple inputs', function() {
    
        let tp = path.join(__dirname, 'success.js');
        let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
    
        tr.run();
        console.log(tr.succeeded);
        expect(tr.succeeded).toBeTruthy();
        expect(tr.warningIssues.length).toEqual(0);
        expect(tr.errorIssues.length).toEqual(0);
        console.log(tr.stdout);
        expect(tr.stdout.indexOf('Hello human')).toBeGreaterThanOrEqual(0)
    });

    it('it should fail if tool returns 1', function() {
        // Add failure test here
    });    
});