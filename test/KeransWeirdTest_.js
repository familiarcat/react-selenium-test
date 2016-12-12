// Component.
const setup = () => {
	const scopes = ['A', 'B', 'C'];
	const data = [{ 'A': 1, 'B': 2, 'C': 3 },
	{ 'A': 1, 'B': 6, 'C': 7 },
	{ 'A': 11, 'B': 22, 'C': 14 }];
	return { scopes, data };
};

describe('KIERAN\'S WEIRD TEST: reduction', () => {
	it('should transform our data into a flat array of ordered priorities', () => {
		const { scopes } = setup();
		const { data } = setup();

		data.map((scope, index) => {
			let ret = {};
			scopes.map((key, index) => {
				console.log("key", key)
			})
		});
		// format [{1:{2:{3:true}}}, {1:{6:{7:true}}}, {11:{22:{14:true}}}
		expect(component.props.label).toBe('All');
	});
});
