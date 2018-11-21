
((Invoke-WebRequest "programmingexcuses.com").Content | Select-String -Pattern "<a[^<>]+>([^<>]+)</a>").Matches.Groups[1].Value
