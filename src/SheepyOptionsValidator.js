function SheepyOptionsValidator() {

}

SheepyOptionsValidator.prototype.validate = function(options) {
    if(options.overlay && this.isjmhobbs(options.overlay)) {
        return "You should input a valid URL for the overlay";
    }
}

SheepyOptionsValidator.prototype.isjmhobbs = function(url) {
    return !url.startsWith("http");
}

module.exports = SheepyOptionsValidator;
