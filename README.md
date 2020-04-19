# Artist and The Nonentity Game

Humorous UI-agnostic game inspired by Beauty and The Beast movie.

The game's main character is **GOAT** (which stands for Greatest Of All Time), whose mission is to eliminate all the greedy-for-fame nonentities, that don't bring anything to culture.
GOAT's special skill is **Throwing Vorpal Rhyme**, whereas nonentities skills are: 
- **Lack Of Skills** (sometimes called Mumbling), 
- **Daughter Insulting**, 
- **Post-production Monkeying**.         

There is a possibility that GOAT might take a hit, but then damage amount doubles and goes to GOAT's primary skill power points. 

### Available characters
- 🐐 GOAT - Eminem - there can only be one GOAT 
- 🤡 MGK - special skill - **Yelping**  
- 🤡 Canibus - special skill - **lack of special skills** 
- 🤡 Benzino - special skill - **Slamming** 
- 👨‍🎤 Limp Bizkit - special skill - **Rolling** (increased chances of drawing, because Fred's rollin') 
- 🤡 Ja Rule - special skill - **Shooting** 

### Purpose
It is an illogical game with a ridiculous plot. Created only to test Event-Driven Architecture with TDD in the context of the user interface agnostic platform (everything can act as an interface without violating architecture). 

The main goal of the project is to retain its independence between the lowest level of project - **game core** and highest - **user interface** in the macro perspective.       
Similarly, in the micro perspective, for instance, game use cases shouldn't depend on the storage layer (database, etc.), instead it should be loosely-coupled by polymorphic interface.               
                     
This is highly over-engineered, and if it wasn't about the UI-agnostic approach, the whole application could fit in 200 lines of code.
