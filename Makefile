run:
	yarn start

deploy:
	yarn build
	git add .
	git commit -m "Build"
	git push
	yarn deploy
