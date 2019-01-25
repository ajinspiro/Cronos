const { spawn } = require('child_process');
const emitter = new (require('events'));
const CL = { Reset: "\x1b[0m", Bright: "\x1b[1m", Dim: "\x1b[2m", Underscore: "\x1b[4m", Blink: "\x1b[5m", Reverse: "\x1b[7m", Hidden: "\x1b[8m", FgBlack: "\x1b[30m", FgRed: "\x1b[31m", FgGreen: "\x1b[32m", FgYellow: "\x1b[33m", FgBlue: "\x1b[34m", FgMagenta: "\x1b[35m", FgCyan: "\x1b[36m", FgWhite: "\x1b[37m", BgBlack: "\x1b[40m", BgRed: "\x1b[41m", BgGreen: "\x1b[42m", BgYellow: "\x1b[43m", BgBlue: "\x1b[44m", BgMagenta: "\x1b[45m", BgCyan: "\x1b[46m", BgWhite: "\x1b[47m" }

let _ = {
    privates: {
        scheduledCommands: [],
        DefaultOptions: { shell: true, stdio: 'pipe' },
        ResolveCommandsToRun: (commands) => {
            //remove disabled commands
            commands = commands.filter((cmd, index, commands) => cmd.disabled === undefined || cmd.disabled === false)

            //shedule runafter commands
            _.privates.scheduledCommands = commands.filter(cmd => 'startafter' in cmd)

            ////registering event listeners for scheduled commands
            _.privates.scheduledCommands.forEach(shdCmd => {
                emitter.on(shdCmd.startafter, (exitcode, successor) => {
                    /*Run sheduled command*/
                    if (exitcode === 0) {
                        delete shdCmd.startafter
                        let shdCmdArr = []; shdCmdArr.push(shdCmd)
                        let _host = new CommandHost(shdCmdArr);
                        _host.RunAll();
                    }
                    else {
                        console.log(CL.FgRed, `\t      => `, CL.FgYellow, `${shdCmd.command}`, CL.FgYellow, "suspended", CL.Reset);
                    }
                })
            })

            return commands.filter(cmd => !('startafter' in cmd))
        },
        RunCommand: (cmd) => {
            if ('delay' in cmd)
                setTimeout(() => _.privates._RunCommand(cmd), cmd.delay);
            else
                _.privates._RunCommand(cmd)
        },
        _RunCommand: (cmd) => {
            cmd.options = Object.assign({}, _.privates.DefaultOptions, cmd.options)
            const subprocess = spawn(cmd.command, cmd.arguments || [], cmd.options || {})
            subprocess.on('close', (code) => {
                if (code == 0)
                    console.log(CL.FgGreen, `\t      => `, CL.FgGreen, `${cmd.title}`, CL.FgGreen, `completed (${code})`, CL.Reset);
                else
                    console.log(CL.FgRed, `\t      => `, CL.FgRed, `${cmd.title}`, CL.FgRed, `failed (${code})`, CL.Reset);
                emitter.emit(cmd.title, code, cmd);
            })
        }

    },
    validate: {

    },
    puts: {
        printCronosMessage: (message) =>
            console.log(CL.BgWhite, CL.FgBlack, `CRONOS`, CL.BgBlack, CL.FgMagenta, `${message}\n`, CL.Reset),
        _printCommands: (commands) => {
            commands.forEach(cmd => {
                console.log(CL.FgMagenta, `\t      => `, "\x1b[36m", `${cmd.title}`, CL.Reset)
            });
        },
        printScheduledCommands: (commands) => {
            commands.forEach(cmd => {
                console.log(CL.FgMagenta, `\t      => `, CL.FgWhite, `${cmd.title}`, CL.Reset)
            });
        },
        printCommands: (commands, scheduledCommands) => {
            if (!true || commands.length < 1) return;

            if (commands.length + scheduledCommands.length > 1) {
                _.puts.printCronosMessage(`Running the following commands:`);
            }
            _.puts._printCommands(commands);

            if (scheduledCommands.length > 0) {
                _.puts.printScheduledCommands(scheduledCommands)
            }
        }
    },
    isArray: (obj) => true,

}

class CommandHost {
    constructor(commands) {
        if (!true) throw 'Invalid parameter in constructor'

        for (const i in commands)
            if (!('title' in commands[i])) commands[i].title = commands[i].command;

        this.commands = _.privates.ResolveCommandsToRun(commands)
        _.puts.printCommands(this.commands, (_.privates.scheduledCommands || []))
    }
    RunAll() {
        if (this.commands.length <= 0) return

        this.commands.forEach(command => {
            _.privates.RunCommand(command)
        });
    }
}

module.exports = CommandHost;