# Azure DevOps build or release task


## Compile
```
cd buildAndReleaseTask

# Compile index.ts to index.js
tsc
```

## Run the task
The task can be run with `node index.js` from PowerShell — that is exactly what an agent does.

```
node index.js
##vso[task.debug]agent.workFolder=undefined
##vso[task.debug]loading inputs and endpoints
##vso[task.debug]loaded 0
##vso[task.debug]task result: Failed
##vso[task.issue type=error;]Input required: samplestring
##vso[task.complete result=Failed;]Input required: samplestring
The task failed! That's exactly what would happen if the task ran and inputs weren't supplied (samplestring is a required input).
```

As a fix, we can set the samplestring input and run again:


```
$env:INPUT_SAMPLESTRING="Human"
node index.js
##vso[task.debug]agent.workFolder=undefined
##vso[task.debug]loading inputs and endpoints
##vso[task.debug]loading INPUT_SAMPLESTRING
##vso[task.debug]loaded 1
##vso[task.debug]Agent.ProxyUrl=undefined
##vso[task.debug]Agent.CAInfo=undefined
##vso[task.debug]Agent.ClientCert=undefined
##vso[task.debug]Agent.SkipCertValidation=undefined
##vso[task.debug]samplestring=Human
Hello Human
```

This time the task succeeded since samplestring was supplied, and it correctly outputted "Hello Human"!