# Getting Started

```shell
git clone https://github.com/designabyss/basic-boilerplate.git newprojectname
cd newprojectname
git remote rm origin
```

## Install dependencies

cd to project directory. This would take a while

```shell
npm install
bower install
```

## How to build

```shell
gulp bower
gulp serve
```

**gulp bower** builds libraries

**gulp serve** builds everything else, conjures up development server and then starts watching for changes


> **Note:** Build system is based on *Gulp 4*
