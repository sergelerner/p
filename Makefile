run:
	yarn start

deploy:
	yarn build
	cd static && cp ./index.html ./200.html
	git add .
	git commit -m "Build"
	git push
	cd static && surge
