image.build:
	docker build -t behran/quasarframework ./docker/node
image.push:
	docker push behran/quasarframework
image.pull:
	docker image pull behran/quasarframework
run.dev:
	docker run --rm -it -v  `pwd`:/code -w /code -p 8226:8080 behran/quasarframework quasar dev
run.npm.i:
	docker run  -e NODE_ENV='development' --rm -it -v  `pwd`:/code -w /code -p 8226:8080 behran/quasarframework quasar new store store-tasks
