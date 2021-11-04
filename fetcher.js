const net = require("net");
const request = require("request");
const fs = require("fs");
const conn = net.createConnection({
	host: "example.edu",
	port: 80,
});
let stats = {};

const fetcher = (url, lfp) => {
	request(url, (error, response, body) => {
		console.log("error:", error);
		fs.writeFile(lfp, body, (err) => {
			if (err) {
				console.error(err);
				return;
			} else {
				fs.stat(lfp, (err, fileStats) => {
					if (err) {
						console.log(err);
					} else {
						stats = fileStats.size;
						console.log(`Downloaded and saved ${stats} bytes to ${lfp}`);
					}
				});
			}
		});
	});
};

fetcher("http://www.example.edu/", "/vagrant/w2/d3-net/page-fetcher/test.txt");
