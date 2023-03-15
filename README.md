# fibonacci-grid
Grid representation with Fibonacci feature.

Read bellow for ADR's, see [CONTRIBUTING.md](./CONTRIBUTING.md) on how to run.


> ***PLEASE NOTE!***
>
> Code is unclear, there's some garbage, and some things isn't implemented.
>
> Unfortunately I don't have enough time to finish.



## Immutability
Definitely "mandatory to help", and really useful even for RxJS-like streams.

There's nothing to add, everybody know how its useful, and how this is combination with any v-DOM or change detection. <br/>
And its even with nested structures combined :wink:


> ***Note on why I've didn't used `immutable-js` <u>for now</u>:***
> 
> - I want to show my coding skills, see section 1  :upside_down_face:
> - You need to be sure that Immutable data structure works well with persistent and/or so called "rehydrated" stores, especially when Server-Side Rendering takes place.



## Using of libraries
Yes, this code is a bit hard to read in some pieces, and there's a lot of space for libraries.

**But!** 
- I'm actually enjoying an opportunity to write some nice code for this solution
- I want to show my coding skills, in overall:
  - Basic JS, Algo, and memory efficiency
  - Typescript, with a lot of its aspects
  - Kotlin, I do know what nice Generic should look like and what is basic OOP concepts (bingo: SOLID, YAGNI, DRY, KISS)
- I want to show my skills with Kotlin and other OOP-oriented languages as well! <br/>
  With some cool and "hard to google it" <u>**generics written by me**,</u> as an example :wink:
  > (As I've been practicing my OOP skills and approaches during my 1 year of Kotlin experience. 1 of 3 years at Tinkoff overall.)
- I want to show my knowledge of React's concepts, as well as concepts of different Frontend approaches.


## Code documentation
Code should be
- "self-descriptive"
- not only should have all corresponding and made to be reusable types and models
- but also should have nice "how to use" and "what to expect" JSDoc, especially in cases like "Overloading"
  > Which I'm definitely lacking, in attempts to save the time… <br/>
  > (It's 20:47 on the moment of mentioning this)


## Store and change-detection approaches

### 0. React-way, dude. But <u>always Immutable</u>.
Which means representing grid as a bunch of individual elements with an immutable data-types.

Here we considering that React are really fast on v-DOM calculations, while app is designed in a way, where only edge-nodes of v-DOM three are actual DOM nodes (and changes).

> ***And enhancement im my approach:***
> There's additional "row changes detection", which is still useless for any update, evolving full column vertical updates.
> But still useful in some cases.
>
> Here and later I'll be considering that any of "row" or "col" changes detection are implemented as well, as they're extremely cheap.

**Pros:**
- ***THE MOST IMPORTANT:*** I want to show my knowledge of React, after all :call_me_hand:
- Easy to understand
- For juniors its easy to write any algorithm on changing any data
- Easy to scale, eg if there's multiple algorithms implemented on top of each other
- Will work, effective or not, in any case
    - React is design and build to make you don't worry about effective updates, just change your data.<br />
        Anyway, it was actually built just to make Facebook's Chat finally work as expected.
        - [The React Story: How Facebook's Instagram Acquisition Led To The Open Sourcing of React.js](https://stackshare.io/posts/the-react-story)

**Cons:**
- Other approaches, especially RxJS, sometimes can be way more effective;
- Unnecessary updates may trigger unnecessary updates and animations.



### 1. Redux-like immutable stores
Which have same base as described above, but some more additional pros.

**Pros:**
- You'd able to
    - dispatch actions
    - intercept actions
    - do updates in multiple stores with one action;
- and use "effect-based" actions handling approach, such as **Redux-Saga**;
- Its definitely one of nice approaches to scale your app
- you'll have a nice "Redux-Devtools" after all, as well as "time travel" feature, actions history & more…

**Cons:**
- Mostly the same as described above

> ***Note on why there's not Sate-Manager (like Redux) <u>for now</u>:***
>
> - I don't need one for now, for real :upside_down_face:
> - I'ts easy to switch on such approach later, as the base is definitely the same.



### 2. 2500+ observables
Which means:
- Flat Map
- or Flat/Matrix Array of all elements

where key is `(rowIndex, colIndex)`, and each element is RxJS-like Subject or Stream.

The key 

**Pros:**
- Can be better for larger grids
- Updates can be split into atomic async not only with help of React Fibers, but can be pre-batched any way we like it.
- Random updates distributed over 

**Cons:**
- May be harder to extend within existing app, when logic or view is changed;
- Definitely not a solution to maintain by "Junior", especially familiar with React only.

## Performance
I'll not dig deep here, as there's a lot of issues and troubleshooting skills to discuss.

But, I want you to notice:
- Yes, it's all about it;
- Yes, there's a lot of React tools for it, like an:
  - `useCallback` for rerender-optimization
  - `useEffect` for reducing of execution of side-effects
  - `React.memo` for props+state "shallowEqual" optimization
  - and a lot more [already offered](https://reactjs.org/docs/optimizing-performance.html)
  - BUT! you still need to think about performance and security.
