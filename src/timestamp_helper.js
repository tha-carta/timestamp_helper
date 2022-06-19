function extractNumerics(str) {
	return str.match(/[1-9]\d*(?:\.\d+)?/g) || [];
}

function isDecimalTimestamp(numeric_str) {
	return numeric_str.toString().includes(".");
}

function toMillis(ts_str) {
	if (isDecimalTimestamp(ts_str)) return { ms: parseFloat(ts_str) * 1000, desc: "DECIMAL SECONDS" };
	if (ts_str.length == 10) return { ms: parseInt(ts_str) * 1000, desc: "INTEGER SECONDS" };
	if (ts_str.length == 19) return { ms: parseInt(ts_str) / 1000000, desc: "INTEGER NANOSECONDS" };
	return { ms: parseInt(ts_str), desc: "INTEGER MILLISECONDS" };
}

function makeHumanReadableOutput(ms_from_e) {
	let myDate = new Date(ms_from_e);
	let utc = "--> UTC:  \t" + myDate.toLocaleString('en-US', { timeZone: 'UTC' }) + "\n";
	let local = "--> LOCAL:\t" + myDate.toLocaleString('en-US') + "\n";
	return utc + local;
}

function convertTimestamp(ts) {
	conversion = toMillis(ts);
	let output = "> Interpreting as " + conversion.desc + " from epoch...\n"
	return output + makeHumanReadableOutput(conversion.ms)
}

function convertAllTimestamps(input) {
	if (input == null || input == "") return "No input provided";
	let output = "Analyzed input: \"" + input + "\"\n";
	let numerics = extractNumerics(input.toString());
	numerics.forEach(s => { output += "\nFound numeric: \"" + s + "\"\n" + convertTimestamp(s); });
	return output;
}

module.exports = {
	extractNumerics,
	isDecimalTimestamp,
	toMillis,
	convertAllTimestamps
};

const input = process.argv.slice(2).join(' ');
console.log(convertAllTimestamps(input));