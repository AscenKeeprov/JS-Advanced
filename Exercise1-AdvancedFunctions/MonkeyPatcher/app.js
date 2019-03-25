let solution = (function () {
	const functionalities = {
		downvote: (post) => post.downvotes++,
		rate: (post) => {
			let totalVotes = post.upvotes + post.downvotes;
			if (totalVotes >= 10) {
				let netScore = post.upvotes - post.downvotes;
				if (netScore >= 0) {
					let upvotesPercentage = post.upvotes / totalVotes * 100;
					if (upvotesPercentage > 66) return 'hot';
					else if (post.upvotes > 100 || post.downvotes > 100) return 'controversial';
					else return 'new';
				} else return 'unpopular';
			} else return 'new';
		},
		score: (post) => {
			let postRating = functionalities.rate(post);
			let obfuscateFactor = 0;
			if (post.upvotes + post.downvotes > 50) obfuscateFactor = Math
				.ceil(Math.max(post.upvotes, post.downvotes) * 0.25);
			return [
				post.upvotes + obfuscateFactor,
				post.downvotes + obfuscateFactor,
				post.upvotes - post.downvotes,
				postRating
			];
		},
		upvote: (post) => post.upvotes++
	}
	return function (arguments) {
		let action = (Array.isArray(arguments) ? arguments[0] : arguments).toLowerCase();
		let result = functionalities[action](this);
		if (action === 'score') return result;
	}
})();

let post = {
	id: '1337',
	author: 'John Doe',
	content: 'Lorem ipsum',
	upvotes: 167,
	downvotes: 163
};

console.log(solution.call(post, 'score'));
solution.call(post, 'downvote');
solution.call(post, 'upvote');
