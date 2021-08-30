# Rick-and-Morty-Dictionary

Group project by Eva Tu and Anh-vu Dinh. 3rd week students at Flatiron. Javascript based search add-on for browsing, https://rickandmortyapi.com/

Features of this project.

https://github.com/anh-vudinh/Rick-and-Morty-Dictionary/blob/main/Preview1.jpg

#1.1# Dynamic search bar. You can search based on category, name, or category + name

#1.2# Search bar will populate the gallery with matching string combination. Example- if you type ab, if the letters ab exist anywhere in a character's name in that specific order then they will be added into the gallery

#1.3# Searchbar category -, implies that you want to search through all categories

#2# After a search, the gallery is populated with clickable images when clicked, it will remove the elements of the gallery page and show the user new elements which provide more information on the selected character

#3.1# When search criteria is provided, users will be given back and forward buttons which will allow them to navigate through the gallery so they can view all matches returned

#3.2# Back and forward buttons will disable and lighten when there is no more characters to iterate through beyond that point

#4# The elements on the first page adjust based on user screen size



https://github.com/anh-vudinh/Rick-and-Morty-Dictionary/blob/main/Preview2.jpg

#5# The details page provides name, status, species, gender, and origin

#6# The detail text can be edited by clicking on their textbox then filling in whatever text you wish.

#7# There is a like and dislike counter so users can rate the character

#8# The save changes button saves all changes done to the character details and the like/dislike

#9# The saved data will be patched to the db.json within this file. If not already run using your terminal "json-server --watch db.json" without quotes after you've navigated inside the Rick-and-Morty-Dictionary folder.



#10.1# At the bottom of index.js there is a commented out section called initialPull(). This was first run to populate the db.json file included. If there are new changes you can modify the pull code to add any missing characters


https://github.com/anh-vudinh/Rick-and-Morty-Dictionary/blob/main/Preview3.jpg

#11# When user selects an image after a search, they will a list will expand to the left of the screen

#12.1# The list allows the user to quickly browse through their previous search matches without having to type the same search criteria into the search fields
#12.2# By click on the Names in the list, the user can display the clicked character into the info page
#12.3# Note that the selection will not be highlighted, that property belongs to the (E) button

#13.1# The (E) button gets the episodes from the R&M API and puts them in a list at the center of the screen
#13.2# The episode number, episode name, and air date will be displayed
#13.3# The user can click any of the 3 corresponding Anchors and a new tab will be opened directing to the fan-made wiki associated with that episode
#13.4# There is a red X in the top right corner of the episodes list which will close the window
#13.5# If user wishes just to browse episodes for other characters in the list to the left side, they can just leave the episode list open and press (E) on a new character. This will populate the opened list with the newly selected character's episodes
#13.6# By pressing (E) on a new character, it will highlight which character's episode list the user has open in red.

#14.1# The Hide/Show List button will toggle the visibility of the left side list.
#14.2# After any new search is performed the list will be cleared out and will be populated again once any character is selected from the Gallery after the search
