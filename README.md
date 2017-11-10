# project_1
Course Information Design First Project


## My Data

The data I used is called Correlates of War: World Religions (World, regional, and national populations by religious beliefs) [Link to dataset](https://www.kaggle.com/umichigan/world-religions/data)

Excerpt from their Data Description: 

The World Religion Project aims to provide detailed information about religious adherence worldwide since 1945. It contains data about the number of adherents by religion in each of the states in the international system for every half-decade period. Some of the religions are divided into religious families, and the breakdown of adherents within a given religion into religious families is provided to the extent data are available.
The project was developed in three stages. The first stage consisted of the formation of a religions tree. A religion tree is a systematic classification of major religions and of religious families within those major religions. To develop the religion tree we prepared a comprehensive literature review, the aim of which was to define a religion, to find tangible indicators of a given religion of religious families within a major religion, and to identify existing efforts at classifying world religions. The second stage consisted of the identification of major data sources of religious adherence and the collection of data from these sources according to the religion tree classification. This created a dataset that included multiple records for some states for a given point in time, yet contained multiple missing data for specific states, specific time periods, and specific religions. The third stage consisted of cleaning the data, reconciling discrepancies of information from different sources, and imputing data for the missing cases.

### Acknowledgements
The dataset was created by Zeev Maoz, University of California-Davis, and Errol Henderson, Pennsylvania State University, and published by the Correlates of War Project.

# Bar Chart

## My Goal

To show the most popular religions around the globe I chose to use a Bar Chart, simply because this chart is very straightforward and will give you an immediate answer. In this case “What religion is the most popular around the world?”

### Getting Started

First thing’s first, find a skeleton to work off of. 

I used the Simple Bar Chart in V4 by Mike Bostock [Link to Bar Chart](https://bl.ocks.org/mbostock/3885304) for the base.
I copied and pasted his code, and separated HTML from CSS and Javascript. 

![screen1](1.png)

Now that I had a working skeleton, I had to add my own data. Using Excel I deleted rows of data that I didn’t need, and was left with the data that was relevant. I only used the rows which said for instance ‘Christianity_all’  instead of adding all the subgroups of christianity. The two dates that I kept the data for are 1950 and 2010. 

[PIC2]

Now I put that data in a CSV format and added it to my files. To load in this CSV file I had to change the name of the dataset that was being loaded in. 

[PIC5 + 6]

 Now I had to change all the instances where the code returned the wrong value from the dataset that was contained in the example. So d.salesperson changed to d.religon, and d.sales to d.believers. This way the chart would be returning values from my own data.

[PIC3 + 4]

I’ve changed the margins and width of my chart to make it a bit more organised. Now it looks like this:

[PIC7]

After seeing how small and uninteresting some values are, like zoroastrianism, baha'i and taoism (They are way too small compared to the other religions) I’ve decided to add these values onto ‘Other religions’. After this change the chart became way more neat and understandable

[PIC8]

The Tooltip

I wanted to add a little bit of interaction in the form of a Tooltip. I’ve used one before, but it doesn’t work in V4 of D3.js. When I try to add it I get the error “d3-tip is not a function”. I really wanted a tooltip, because it gives the user some extra insight into how much believers there are, because I don’t have a super detailed y-axis. So I went looking on the internet for a tooltip that could be used in V4. After looking around I found this person: (https://github.com/VACLab/d3-tip) It seemed like he had the same troubles as me

[PIC9]

He claimed to have made a tooltip that can be used with V4 and without ES6. In his words: “The version of d3-tip in this repository is D3js v4 compatible. At the same time, it does not require ES6 support from your browser. This is accomplished with two basic changes.
	1.	d3.functor is defined. This was defined in version 3 of D3, but disappeared in version 4. It gets redefined in this version of d3-tip. 
	2.	d3.tip is defined. This mimics the prior behavior of d3-tip, allowing you to use tooltips as documented in the original repository (https://github.com/Caged/d3-tip).”
After reading this I tried to use his tooltip in my own code. I went and took a look in his .js file: (https://github.com/VACLab/d3-tip/blob/master/d3-tip.js) I noticed that it looked really complicated and I was lost reading it.
[pic10]
I decided to move on to find another tooltip. I stumbled upon this: (https://bl.ocks.org/alandunning/274bf248fd0f362d64674920e85c1eb7) This person used the same bar chart as a building block, so this should be easy! 
I started adding all the tooltip codes to my own, changing the values to those that matched my data, and soon found some errors. The first one was that ‘Colours are not defined’ I found that they added a fill to the bar svg. So I deleted that line of code. After that, I didn’t get any errors, but my bar chart had turned black, ignoring my css… The tooltip was working though! (The only thing about that was I forgot to delete the pound symbol from the example). 
The example had made a variable of the colors of the bars using a range. so I guess I had to do the same. I didn’t mind, as color didn’t play a big part of my chart. So I re-added the fill attribute and added the colour variables, and everything was fine again. 
[pic]
I was going to worry about the colors and styling later. On to the transition!
The Transition
For the transition I used this example: (https://bl.ocks.org/jamesleesaunders/f32a8817f7724b17b7f1), All I had to do was add a transition with a delay, and make sure that the height that the animation will go to matches the y axis and my data.
.transition()
        .duration(1000)
        .delay(100)
        .attr("y", function(d) { return y(d.believers); })
        .attr("height", function(d) { return height - y(d.believers); })
Uh-oh
After Adding the transition, my tooltip stopped working and i recieved the error Error: unknown type: mousemove in my console log. I started looking at my code and rearranging the attributes in my bar svg. But nothing worked. I went to google for help. It turned out someone had the same problem as me. (https://stackoverflow.com/questions/22645162/d3-when-i-add-a-transition-my-mouseover-stops-working-why)
Apparently, using the .selectAll on the bar chart as a variable, and splitting the transition from the tooltip mouse events should work. So I tried it. It dit take care of the error, but my tooltip still wasn’t showing up. 
After some digging around I found out that the problem was in my .css file. I had forgotten to close the declaration above the tooltip property, and my tooltip started working again. 
[pic]
I was able to style the tooltip with basic css, since the tooltip is linked to class.



