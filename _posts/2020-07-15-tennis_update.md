# State of tennis project

Detectors all working reasonably well. 1-2 mistakes on audio that I need to improve and racquet could be improved but on the whole working.

Rules for determining what has happened in the point.

Hard to say as they may all be dependent on the specific match that I'm doing. So making it work for one match might make it not work for another.
Ideally the rules would be the same but the parameters for where the net/sidelines/baselines are could be input for each match to adjust for camera angle.

Difficulty is that for some points some rules work really well and for some they don't.  Hard to make it fully general.

Goal would be to have multiple layers with different rule conditions kicking in at different times, trusting that we could identify when to move to those different rules.

Going to experiment with that today. Also want to inspect all of the final ball graphs to see if we could learn something about what happened from that and 
maybe train a cnn to tell whether it's net/out/winner.

First experiment is seeing what the performance of expanded player isolation has.

Result, two worse on outcome. Didn't make any better. But thought it would improve 63 - did it? 
It did improve 63 so that returners shot is now included. Shots now looks good apart from having two extra shots at the end that didn't happen.
Easier to deal with that than missing a shot entirely. Keep it for now and explore the other wrong outcomes shots.

Store all the shots in a list of dfs, store all the last balls. 

Examine what's gone wrong, missed shot, confused last shot outcome, whether we could easily tell that something was wrong.

If I'm going to make changes to the pre_procced then create new ones so that I don't have to reproc again to go back.

Manual input on weird camera angle points - flag strange camera, will it work or will splitter just miss it?

Thinking time on paper is good. 

All bad outcomes mapped out. 

After lunch, start fixing.

Process - think of rule that will catch that specific error. Run all with new rule. See which ones it catches. Aiming to only catch errors.




