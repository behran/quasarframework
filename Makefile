image.build:
	docker build -t behran/quasarframework ./docker/node
image.push:
	docker push behran/quasarframework
image.pull:
	docker image pull behran/quasarframework
run.dev:
	docker run --rm -it -v  `pwd`:/code -w /code -p 8226:8226 behran/quasarframework quasar dev
run.npm.i:
	docker run  -e NODE_ENV='development' --rm -it -v  `pwd`:/code -w /code -p 8226:8226 behran/quasarframework quasar new boot router-auth
build:
	docker run --rm -it -v  `pwd`:/code -w /code -p 8226:8226 behran/quasarframework quasar build
