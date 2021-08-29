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
