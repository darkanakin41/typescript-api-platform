local ddb = import 'ddb.docker.libjsonnet';

local db_user = "sandbox";
local db_password = "sandbox";
local db_name = "sandbox";

local domain = std.join('.', [std.extVar("core.domain.sub"), std.extVar("core.domain.ext")]);
local port_prefix = std.extVar("docker.port_prefix");

local php_workdir = "/var/www/html";
local node_workdir = "/app";
local mysql_workdir = "/app";

local prefix_port(port, output_port = null)= [port_prefix + (if output_port == null then std.substr(port, std.length(port) - 2, 2) else output_port) + ":" + port];

ddb.Compose() {
	"services": {
		"node": ddb.Build("node")
		    + ddb.User()
		    + ddb.Binary("ncu", node_workdir, "ncu")
		    + ddb.Binary("npm", node_workdir, "npm")
		    + ddb.Binary("semantic-release-cli", node_workdir, "semantic-release-cli")
		    + ddb.Binary("vue", node_workdir, "vue")
		    + {
			"volumes": [
				ddb.path.project + ":" + node_workdir + ":rw",
				"node-cache:/home/node/.cache:rw",
				"node-npm-packages:/home/node/.npm-packages:rw"
			],
		},
	}
}
