package sublogrus

import (
	"io"
	"os"

	"github.com/sirupsen/logrus"
	easy "github.com/t-tomalak/logrus-easy-formatter"
)

func Sublogrusfunc(f *os.File) *logrus.Logger {
	log := &logrus.Logger{
		//Out:   os.Stdout,
		Out:   io.MultiWriter(f, os.Stdout),
		Level: logrus.TraceLevel,
		Formatter: &easy.Formatter{
			TimestampFormat: "2006/01/02 15:04:05",
			LogFormat:       "%lvl%: [%time%] - %msg%\n",
		},
	}

	return log
}
